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
export default class Inquiry {
    collectionKey = '';
    id:string = '';
    name:string = '';
    email:string = '';
    phone:Number;

    businessName = 'New Business';
    location = '';
    status = 'lead';

    dateReceived = '';
    lastContact = '';
    proposalDate = '';
    
    source = '';
    //coorespondence = [];
    
    //this.calendarSlot = "";
    //this.agreement = {};
    //this.tableMenu = {};

    //if dataObj provided merge matching fields return Client Object
    static convertObject(dataObj:Object): Inquiry{
        let inquiry = new Inquiry();
        for (const [key, value] of Object.entries(dataObj)) {
            inquiry[key] = value;
        }
        return inquiry;
    }

    static createInquiryByClient(client){
        const dataObj = {
            name: client.name,
            email: client.email,
            phone: client.phone,
            eventTitle: 'New Event'
        }
        return Inquiry.convertObject(dataObj);
    }



    accessibleFields = (): Object => {
        const accessField = (value: string, type: AccessData["type"]):AccessData => {
            return { value: value, type: type };
        }

        return {
            //items will appear in the oder they are here
            businessName: accessField(this.businessName, 'text'),
            location: accessField(this.location, 'text'),

            spacer_1: accessField(null, null),
            
            status: accessField(this.status, 'text'),
            source: accessField(this.source, 'text'),
            
            spacer_2: accessField(null, null),
            
            dateReceived: accessField(this.dateReceived, 'date'),
            lastContact:  accessField(this.lastContact, 'date'),
            proposalDate: accessField(this.proposalDate, 'date')
        }
    }

    
}