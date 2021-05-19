import { AccessData } from "./definitions";

export default class Inquiry {
    collectionKey = '';
    id:string = '';
    name:string = '';
    email:string = '';
    phone:Number;

    businessName = '';
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