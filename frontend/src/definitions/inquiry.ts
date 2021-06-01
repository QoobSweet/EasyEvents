import { dbDoc } from "./dbDoc";
import { AccessData, Coorespondence } from "./definitions";

interface StatusEnum {
    id: string;
    order: Number;
    label: string;
    color: string;
    textColor: string;
    borderColor: string;
}


export default class Inquiry extends dbDoc {
    static StatusEnums: StatusEnum[] = [
        {
            id: 'lead',
            order: 1,
            label: 'Lead',
            color: 'yellow',
            textColor: 'black',
            borderColor: 'black'
        },
        {
            id: 'notInterested',
            order: 2,
            label: 'Not Interested',
            color: 'red',
            textColor: 'white',
            borderColor: 'black'
        },
        {
            id: 'proposalSent',
            order: 3,
            label: 'Proposal Sent',
            color: 'blue',
            textColor: 'white',
            borderColor: 'black'
        },
        {
            id: 'awaitingModeration',
            order: 4,
            label: 'Avaiting Moderation',
            color: 'purple',
            textColor: 'white',
            borderColor: 'black'
        },
        {
            id: 'hasScheduledShoot',
            order: 5,
            label: 'Photo Shoot Scheduled',
            color: 'purple',
            textColor: 'white',
            borderColor: 'black'
        },
        {
            id: 'photographed',
            order: 6,
            label: 'Photographed',
            color: 'blue',
            textColor: 'white',
            borderColor: 'black'
        },
        {
            id: 'booked',
            order: 3,
            label: 'Booked',
            color: 'green',
            textColor: 'white',
            borderColor: 'black'
        }
    ]
    static getStatusIds = () => {
        const _r = [];
        Inquiry.StatusEnums.forEach(status => {
            _r.push(status.id);
        })
        return _r;
    }
    static getTodaysDate = () => {
        var date = new Date();
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();

        return yyyy + '-' + mm + '-' + dd;
    }

    identifierLabel = "Inquir";
    collectionKey = 'inquiries';
    parentClientId = '';
    id: string = '';
    lockedFields: string[] = ['dateReceived'];

    businessName: AccessData = this.accessField('Business Name', 'New Business', 'text', 1);
    location: AccessData = this.accessField('Locations', '', 'text', 2);
    status: AccessData = this.accessField('Status', 'lead', 'select', 3, Inquiry.getStatusIds());

    dateReceived: AccessData = this.accessField('Date Recieved', Inquiry.getTodaysDate(), 'date', 4);
    lastContact: AccessData = this.accessField('Last Contact', '', 'date', 5);
    proposalDate: AccessData = this.accessField('Proposal Date', '', 'date', 6);
    
    source: AccessData = this.accessField('Source', '', 'text', 7);
}