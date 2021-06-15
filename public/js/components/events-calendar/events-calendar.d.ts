import { LitElement } from 'lit';
import { Calendar } from '@fullcalendar/core';
import { Event } from '../../definitions/event';
import Inquiry from '../../definitions/inquiry';
export interface FormItem {
    label: String;
    value: String;
}
export declare class EventsCalendar extends LitElement {
    inquiries: Inquiry[] | null;
    scrollToTime: null;
    events: Event[] | null;
    calendar: Calendar | null;
    serverApi: import("../../api/serverApi").ServerApi;
    static styles: import("lit").CSSResultGroup;
    handleDateSelect: (selectInfo: any) => void;
    generateCalendarEvents: () => void;
    getCalendar: () => void;
    firstUpdated(): void;
    updated(): void;
    shouldUpdate(changedProperties: any): boolean;
    render(): import("lit").TemplateResult<1>;
}
//# sourceMappingURL=events-calendar.d.ts.map