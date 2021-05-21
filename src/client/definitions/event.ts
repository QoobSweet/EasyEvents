import Inquiry, { StatusEnums } from "./inquiry";


class Event {
    constructor(inquiry_ID, title, startDate_Time, stopDate_Time, status) {
        const cAlert = (msg) => {
            return window.alert("!! Event  constructor " + msg + " !!")
        }

        if(inquiry_ID){    
            return{
                id: inquiry_ID,
                title: (title)       
                    ? title : cAlert("needs a valid title"),
                
                start: (startDate_Time)   
                    ? startDate_Time : cAlert("needs a valid startDate"),

                end: (stopDate_Time)    
                    ? stopDate_Time  : cAlert("needs a valid stop Date"),
                
                resourceId: StatusEnums[status].resourceId, 
                color: StatusEnums[status].color,
                textColor: StatusEnums[status].textColor,
                borderColor: 'black',
            }
        }   
    }

    static resources = () => {
        const entries = [];
        
        for(const [key, value] of Object.entries(StatusEnums)){
            entries.push({
                id: value.resourceId,
                title: value.label,
                eventColor: value.color,
                eventTextColor: value.textColor,
                eventBorderColor: (value.borderColor) ? value.borderColor : 'black',
                tOrder: (value.order) ? value.order : ''
            })
        }

        return entries;
    }
}

export default Event;