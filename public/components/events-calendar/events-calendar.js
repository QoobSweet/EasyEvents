var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { style } from './events-calendar-css';
import { Event } from '../../definitions/event';
import ServerApi from '../../api/serverApi';
let EventsCalendar = class EventsCalendar extends LitElement {
    inquiries = null;
    scrollToTime = null;
    events = null;
    calendar = null;
    serverApi = ServerApi();
    static styles = style;
    handleDateSelect = (selectInfo) => {
        console.log(selectInfo);
        //calendar.props.children.setScrollToTime(dateObj)
        //prompt(selectInfo.startStr)
        const calendarApi = selectInfo.view.calendar;
        calendarApi.unselect(); // clear date selection 
    };
    /*     handleEventChange = (apiResponse) => {
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
        } */
    generateCalendarEvents = () => {
        console.log('attempting to load events');
        console.log(this.inquiries);
        const events = [];
        if (this.inquiries) {
            for (let i = 0; i < this.inquiries.length; i++) {
                const inquiry = this.inquiries[i];
                console.log(inquiry.lastContact);
                if (inquiry) {
                    if (inquiry.dateReceived.value !== '') {
                        let date = inquiry.dateReceived.value;
                        if (inquiry.lastContact.value !== '') {
                            date = inquiry.lastContact.value;
                        }
                        if (inquiry.businessName.value) {
                            events.push(new Event(inquiry.id, inquiry.businessName.value, date, inquiry.status.value));
                        }
                    }
                }
            }
            this.events = events;
        }
        if (this.events && this.events[0]) {
            //if (this.calendar) { this.calendar.setOption('events', this.events) }
        }
    };
    /*     selectEvent = (eventInfo) => {
            console.log(eventInfo);
            this.timeline.gotoDate(eventInfo.event.startStr);
            this.timeline.scrollToTime(eventInfo.event.startStr.split('T')[1])
    
            let event = new CustomEvent('inquiry-selected', {
                detail: {
                data: eventInfo.event.id,
                message: 'Event Selected'
                },
                bubbles: true,
                composed: true
            });
            this.dispatchEvent(event);
        } */
    /*     renderEventContent = (eventInfo) => {
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
        } */
    getCalendar = () => {
        console.log('grabbing calendar');
        setTimeout(() => {
            const calendarRoot = this.renderRoot.querySelector('#calendar');
            //calendar should not attempt render if no calendarRoot
            if (calendarRoot) {
                this.calendar = new Calendar(calendarRoot, {
                    initialView: 'dayGridMonth',
                    plugins: [dayGridPlugin, timeGridPlugin],
                    headerToolbar: { left: 'title', center: '', right: 'today prev next' },
                    height: '64%',
                    editable: true,
                    selectable: true,
                    selectMirror: true,
                    dayMaxEvents: true,
                    events: this.events ? this.events : [],
                    eventDisplay: 'list',
                    //select: this.handleDateSelect,
                    //eventClick: this.selectEvent,
                    //eventChange: this.handleEventChange,
                    //eventContent: this.renderEventContent, // custom render function
                });
            }
        }, 500);
    };
    firstUpdated() {
        console.log('first update');
        this.getCalendar();
    }
    updated() {
        this.calendar ? this.calendar.render() : this.getCalendar();
        setTimeout(() => {
            this.calendar ? this.calendar.updateSize() : {};
        }, 2000);
    }
    shouldUpdate(changedProperties) {
        changedProperties.forEach((oldValue, propName) => {
            console.log(`${propName} changed. oldValue: ${oldValue}`);
            if (propName == 'inquiries') {
                this.generateCalendarEvents();
                this.getCalendar();
                setTimeout(() => {
                    console.log('attempting to rerender');
                    if (this.calendar) {
                        this.calendar.render();
                    }
                }, 500);
            }
        });
        return true;
    }
    render() {
        this.generateCalendarEvents();
        return html `
            <link href="https://www.unpkg.com/@fullcalendar/common@5.7.0/main.css" rel="stylesheet">
            <div id="calendar"></div>
        `;
    }
};
__decorate([
    property({ type: Array })
], EventsCalendar.prototype, "inquiries", void 0);
__decorate([
    property({ attribute: false })
], EventsCalendar.prototype, "scrollToTime", void 0);
__decorate([
    state()
], EventsCalendar.prototype, "events", void 0);
__decorate([
    state()
], EventsCalendar.prototype, "calendar", void 0);
EventsCalendar = __decorate([
    customElement('events-calendar')
], EventsCalendar);
export { EventsCalendar };
//# sourceMappingURL=events-calendar.js.map