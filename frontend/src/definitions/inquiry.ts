import { dbDoc } from "./dbDoc";

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
    name:string = '';
    email:string = '';
    phone:Number;

    businessName = 'New Business';
    location = '';
    status:StatusEnum = StatusEnums.lead;

    dateReceived = '';
    lastContact = '';
    proposalDate = '';
    
    source = '';

    accessibleFields = ():Object => {
        return {
            //items will appear in the oder they are here
            businessName: this.accessField(this.businessName, 'text'),
            location: this.accessField(this.location, 'text'),

            spacer_1: this.accessField(null, null),
            
            source: this.accessField(this.source, 'text'),
            
            spacer_2: this.accessField(null, null),
            
            dateReceived: this.accessField(this.dateReceived, 'date'),
            lastContact:  this.accessField(this.lastContact, 'date'),
            proposalDate: this.accessField(this.proposalDate, 'date')
        }
    }
}