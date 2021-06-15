import { DbDoc } from "./dbDoc";
export default class Inquiry extends DbDoc {
    static StatusEnums = [
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
    ];
    static getStatusIds = () => {
        const _r = [];
        Inquiry.StatusEnums.forEach(status => {
            _r.push(status.id);
        });
        return _r;
    };
    static getTodaysDate = () => {
        const date = new Date();
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = date.getFullYear();
        return yyyy + '-' + mm + '-' + dd;
    };
    identifierLabel = 'Inquiry';
    collectionKey = 'inquiries';
    parentClientId = '';
    lockedFields = ['dateReceived'];
    businessName = this.accessField('Business Name', 'New Business', 'text', 1);
    location = this.accessField('Locations', '', 'text', 2);
    status = this.accessField('Status', 'lead', 'select', 3, Inquiry.getStatusIds());
    dateReceived = this.accessField('Date Recieved', Inquiry.getTodaysDate(), 'date', 4);
    lastContact = this.accessField('Last Contact', '', 'date', 5);
    proposalDate = this.accessField('Proposal Date', '', 'date', 6);
    source = this.accessField('Source', '', 'text', 7);
    coorespondence = [];
}
//# sourceMappingURL=inquiry.js.map