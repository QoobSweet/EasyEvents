import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import { Definitions } from '../../definitions/definitions';
import { CalendarOptions } from '@fullcalendar/angular';
import '@fullcalendar/react';
import '@fullcalendar/daygrid';
import '@fullcalendar/timegrid';
import '../input-field/input-field';

export interface FormItem {
  label: String,
  value: String
}

@customElement('events-calendar')
export class EventsCalendar extends LitElement {
    @property() serverApi = null;
    @property({ type: Array }) inquiries = null;
    @property() calendar = null;
    @property() timeline = null;
    @property() scrollToTime = null;
    @property() calendarRef = null;
    @property() timelineRef = null;
    @state() events = null;

    static styles = css`
        :host {
        height: 100%;
        width: 100%;
        padding: 15px;
        }
    `;
    
    handleDateSelect = (selectInfo) => {
        console.log(selectInfo);
              
        this.timelineRef.current._calendarApi.gotoDate(selectInfo.startStr)
        //calendar.props.children.setScrollToTime(dateObj)

        //prompt(selectInfo.startStr)
        let calendarApi = selectInfo.view.calendar

        calendarApi.unselect() // clear date selection
    }
    handleEventChange = (apiResponse) => {
        if(apiResponse.oldEvent && apiResponse.event){
            const eventDbId = apiResponse.event.id;

            const oldEvent = apiResponse.oldEvent;
            const newEvent = apiResponse.event;
            
            const oldStartDate = oldEvent.startStr.split('T');
            const newStartDate = newEvent.startStr.split('T');

            const oldEndDate = oldEvent.endStr.split('T');
            const newEndDate = newEvent.endStr.split('T');


            console.log([oldEvent, newEvent, newStartDate])

            //compare dates [0]
            if(newStartDate[0] !== oldStartDate[0]){
                this.serverApi.setFieldValue('inquiries', eventDbId, 'eventDate', newStartDate[0]);
            }
            //compare times [1]
            if(newStartDate[1] !== oldStartDate[1]){
                this.serverApi.setFieldValue('inquiries', eventDbId, 'startTime', newStartDate[0]);
            }
            if(newEndDate[1] !== oldEndDate[1]){
                this.serverApi.setFieldValue('inquiries', eventDbId, 'stopTime', newStartDate[0]);
            }
        }
    }

    generateCalendarEvents = (inquiries) => {
        const events = [];
        
        if(inquiries){
            for(let i = 0; i < inquiries.length; i++){
                const target = inquiries[i];
                if(target){
                    const startDate = target.eventDate + 'T' + target.startTime + ':00';
                    const stopDate = target.eventDate + 'T' + target.stopTime + ':00';

                    events.push(new Definitions.Event(target.id, target.eventTitle, startDate, stopDate, inquiries[i].eventStatus))   
                }
            }
        }

        if(events[0]){
            return events;
        } else {
            return false;
        }
    }

    selectEvent = (eventInfo) => {
        const calendarApi = this.timelineRef.current._calendarApi;
        calendarApi.gotoDate(eventInfo.event.startStr);
        calendarApi.scrollToTime(eventInfo.event.startStr.split('T')[1])

        let event = new CustomEvent('inquiry-selected', {
            detail: {
            data: eventInfo.event.id,
            message: 'Event Selected'
            },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);        
    }

    renderEventContent = (eventInfo) => {
        function addZero(i) {
            if (i < 10) {
                i = "0" + i;
            } else if (i > 12) {
                i = i - 12;
            }
            return i;
          }
        
        
        const start = eventInfo.event.start; //date object
        const end = eventInfo.event.end; //date object

        const sHour = addZero(start.getHours());
        const sMin = addZero(start.getMinutes());
        const sString = sHour + ':' + sMin

        let eString = '';

        if(end){
            const eHour = addZero(end.getHours());
            const eMin  = addZero(end.getMinutes());
            eString = '-' + eHour + ':' + eMin;
        }

        return html`<i className="cal-popup-disp-item">{eventInfo.event.title}</i>`;
    }

    getCalendar = () => { return html`
        <full-calendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
                left: 'title',
                center: '',
                right: 'today prev next'
            }}
            aspectRatio= {1.25}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            events={events} // alternatively, use the `events` setting to fetch from a feed
            eventDisplay='list'
            select={handleDateSelect}
            eventClick={selectEvent}
            eventChange={handleEventChange}
            eventContent={renderEventContent} // custom render function
            eventLimit='5'
            ref={calendarRef}
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
        ></full-calendar>
    `;}
    const getTimeline = () => { return html`
        <full-calendar
            plugins={[resourceTimelinePlugin]}
            schedulerLicenseKey='CC-Attribution-NonCommercial-NoDerivatives'
            timeZone='UTC'
            initialView='resourceTimelineDay'
            aspectRatio= {3}
            slotMinWidth= {25}
            scrollTime='9:00:00'
            headerToolbar= {{
                left: 'title',
                center: '',
                right: 'prev next'
            }}
            editable={true}
            eventStartEditable={true}
            selectable= {true}
            resourceAreaColumns={resourceAreaColumns}
            resourceOrder= 'tOrder'
            resources={Definitions.Event.resources()}
            events={events}
            eventClick={selectEvent}
            ref={timelineRef}
        ></full-calendar>
    `;}
  
  

render() {
    this.events = this.generateCalendarEvents(this.inquiries);
    this.calendar = this.getCalendar();
    this.timeline = this.getTimeline();

    return html`
      <div class='CalendarPane-Calendars'>
          <div class='CalendarPane-basicCalendar-container'>
              <div class="-AppContentFull">
                  ${this.calendar}
              </div>
          </div>

          <div class='CalendarPane-basicCalendar-container'>
              <div class="-AppContentFull">
                  ${this.timeline}
              </div>
          </div>
      </div>
    `;
  }
}