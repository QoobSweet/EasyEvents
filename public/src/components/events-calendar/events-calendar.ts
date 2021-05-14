import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import { Definitions } from '../../definitions/definitions';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

import '../input-field/input-field';
import { style } from './events-calendar-css';

export interface FormItem {
  label: String,
  value: String
}

@customElement('events-calendar')
export class EventsCalendar extends LitElement {
    @property() serverApi = null;
    @property({ type: Array }) inquiries = null;
    @property() scrollToTime = null;
    @state() events = null;
    @state() calendar:Calendar = null;
    @state() timeline:Calendar = null;

    static styles = style;
    
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

    generateCalendarEvents = () => {
        const events = [];
        
        if(this.inquiries){
            for(let i = 0; i < this.inquiries.length; i++){
                const target = this.inquiries[i];
                if(target){
                    const startDate = target.eventDate + 'T' + target.startTime + ':00';
                    const stopDate = target.eventDate + 'T' + target.stopTime + ':00';

                    events.push(new Definitions.Event(target.id, target.eventTitle, startDate, stopDate, this.inquiries[i].eventStatus))   
                }
            }
        }

        events[0] ? this.events = events : this.events = null;
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

    firstUpdated() {
        this.calendar = new Calendar(this.renderRoot.querySelector('#calendar'), {
            initialView: 'dayGridMonth',
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            headerToolbar: { left: 'title', center: '', right: 'today prev next' },
            height: '100%',
            expandRows: true,
            handleWindowResize: true,
            editable: true,
            selectable: true,
            selectMirror: true,
            dayMaxEvents: true,
            events: this.events,
            eventDisplay: 'list',
            select: this.handleDateSelect,
            eventClick: this.selectEvent,
            eventContent: this.renderEventContent,
            eventChange: this.handleEventChange,
        });

        this.timeline = new Calendar(this.renderRoot.querySelector('#timeline'), {
            initialView: 'resourceTimelineDay',
            plugins: [resourceTimelinePlugin],
            headerToolbar: { left: 'title', center: '', right: 'prev next' },
            schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
            height: '100%',
            expandRows: true,
            handleWindowResize: true,
            timeZone: 'UTC',
            aspectRatio: 3,
            slotMinWidth: 25,
            scrollTime: '9:00:00',
            editable: true,
            eventStartEditable: true,
            selectable: true,
            resourceOrder: 'tOrder',
            resources: Definitions.Event.resources(),
            events: this.events,
            eventClick: this.selectEvent
        });
    }
  

render() {
    this.generateCalendarEvents();
    this.calendar ? this.calendar.render() : {};
    this.timeline ? this.timeline.render() : {};

    return html`
        <div class="half-wrap">
            <div id="calendar"></div>
        </div>
        <div class="half-wrap">
            <div id="timeline"></div>
        </div>
    `;
  }
}