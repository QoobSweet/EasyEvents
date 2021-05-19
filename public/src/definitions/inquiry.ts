
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
    merge(dataObj):Inquiry{
        if(dataObj){
            for (const [key, value] of Object.entries(dataObj)) {
                this[key] = value;
            }
        }
        return this;
    }

    static createInquiryByClient(client){
        const dataObj = {
            name: client.name,
            email: client.email,
            phone: client.phone,
            eventTitle: 'New Event'
        }
        return new Inquiry().merge(dataObj);
    }



    accessibleFields = () => {
        const basicInfo = {
            //items will appear in the oder they are here
            eventTitle:     this.eventTitle,
            eventStatus:    this.eventStatus,
            guestCount:     this.guestCount,
            eventDate:      this.eventDate,
            room:           this.room,
    
            startTime:      this.startTime,
            stopTime:       this.stopTime,            
    
            company:        this.company,
            
            dateReceived:   this.dateReceived,
            source:         this.source,
            sourceLocation: this.sourceLocation
        }
    }

    
}