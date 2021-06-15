import Inquiry from "./inquiry";


export class Event {
    id = '';
    resourceId = 'lead';
    title = 'Blank Event';
    start = Inquiry.getTodaysDate();
    color = 'white';
    textColor = 'black';
    borderColor = 'black';


    constructor(inquiryID: string, title: string, date: string, status: string) {
        const cAlert = (msg: string) => {
            throw new Error("!! Event  constructor " + msg + " !!");
        }

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
            this.borderColor = stausObj.borderColor
        }
    }
}

export default Event;