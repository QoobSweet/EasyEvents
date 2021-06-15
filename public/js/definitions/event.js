import Inquiry from "./inquiry";
export class Event {
    constructor(inquiryID, title, date, status) {
        this.id = '';
        this.resourceId = 'lead';
        this.title = 'Blank Event';
        this.start = Inquiry.getTodaysDate();
        this.color = 'white';
        this.textColor = 'black';
        this.borderColor = 'black';
        const cAlert = (msg) => {
            throw new Error("!! Event  constructor " + msg + " !!");
        };
        if (inquiryID && inquiryID !== "") {
            console.log(inquiryID);
            console.log(status);
            console.log(date);
            const stausObj = Inquiry.StatusEnums.filter(s => s.id === status)[0];
            this.id = inquiryID;
            this.resourceId = status;
            this.title = (title) ? title : cAlert("needs a valid title");
            this.start = (date) ? date : cAlert("needs a valid startDate");
            this.color = stausObj.color,
                this.textColor = stausObj.textColor,
                this.borderColor = stausObj.borderColor;
        }
    }
}
export default Event;
//# sourceMappingURL=event.js.map