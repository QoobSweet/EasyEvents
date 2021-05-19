
export default class Inquiry {
    collectionKey = '';
    id = '';
    name = 'New Inquiry';
    email = '';
    phone = 0;
    eventTitle = '';
    eventStatus = 'lead';
    guestCount = '';
    eventDate = '';
    room = '';
    startTime = "12:00";
    stopTime = "15:00";           
    company = '';
    dateReceived = '';
    source = '';
    sourceLocation = '';
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
        return {
            //items will appear in the oder they are here
            eventTitle:     this.eventTitle,
            eventStatus:    this.eventStatus,
            
            dateReceived:   this.dateReceived,
            eventDate:      this.eventDate,

            room:           this.room,
            guestCount:     this.guestCount,

            startTime:      this.startTime,
            stopTime:       this.stopTime,            
            
            source:         this.source,
            company:        this.company,
            
            sourceLocation: this.sourceLocation
        }
    }

    
}