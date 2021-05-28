import { dbDoc } from "./dbDoc";
import { AccessData } from "./definitions";

interface StatusEnum {
    resourceId: string;
    order: Number;
    label: string;
    color: string;
    textColor: string;
    borderColor: string;
}
interface StatusEnums {
    lead: StatusEnum;
    notInterested: StatusEnum;
    proposalSent: StatusEnum;
    awaitingModeration: StatusEnum;
    hasScheduledShoot: StatusEnum;
    photographed: StatusEnum;
    inDevelopment: StatusEnum;
}

export const StatusEnums:StatusEnums = {
    lead: {
        resourceId: 'lead',
        order: 1,
        label: 'Lead',
        color: 'yellow',
        textColor: 'black',
        borderColor: 'black'
    },
    notInterested: {
        resourceId: 'notInterested',
        order: 2,
        label: 'Not Interested',
        color: 'red',
        textColor: 'black',
        borderColor: 'black'
    },
    proposalSent: {
        resourceId: 'proposalSent',
        order: 3,
        label: 'Proposal Sent',
        color: 'blue',
        textColor: 'blue',
        borderColor: 'black'
    },
    awaitingModeration: {
        resourceId: 'awaitingModeration',
        order: 4,
        label: 'Avaiting Moderation',
        color: 'purple',
        textColor: 'blue',
        borderColor: 'black'
    },
    hasScheduledShoot: {
        resourceId: 'hasScheduledShoot',
        order: 5,
        label: 'Photo Shoot Scheduled',
        color: 'purple',
        textColor: 'white',
        borderColor: 'black'
    },
    photographed: {
        resourceId: 'photographed',
        order: 6,
        label: 'Photographed',
        color: 'blue',
        textColor: 'white',
        borderColor: 'black'
    },
    inDevelopment: {
        resourceId: 'booked',
        order: 3,
        label: 'Booked',
        color: 'green',
        textColor: 'white',
        borderColor: 'black'
    }
}

export default class Inquiry extends dbDoc {
    identifierLabel = "Inquir";
    collectionKey = 'inquiries';
    parentClientId = '';
    id:string = '';

    businessName: AccessData = this.accessField('Business Name', 'New Business', 'text', 1);
    location: AccessData = this.accessField('Locations', '', 'text', 2);
    status: AccessData = this.accessField('Status', { type: 'StatusEnums', value: StatusEnums.lead}, 'select', 3);

    dateReceived: AccessData = this.accessField('Date Recieved', '', 'date', 4);
    lastContact: AccessData = this.accessField('Last Contact', '', 'date', 5);
    proposalDate: AccessData = this.accessField('Proposal Date', '', 'date', 6);
    
    source: AccessData = this.accessField('Source', '', 'text', 7);
}