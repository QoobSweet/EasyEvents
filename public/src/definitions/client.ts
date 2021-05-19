

export default class Client {
    collectionKey = '';
    id = '';
    name = 'New Client';
    email = '';
    phone = '';
    inquiries = [];


    //if dataObj provided merge matching fields return Client Object
    merge(dataObj){
        if(dataObj){
            for (const [key, value] of Object.entries(dataObj)) {
                if (key in this) {
                    this[key] = value;
                }
            }
        }
    }


    setID(id){
        this.id = id;
    }

    setName(name) {
        this.name = name;
    }
    
    setEmail(email){
        this.email = email;
    }
    
    setPhone(phone){
        this.phone = phone;
    }

    getInquiries(){
        if(this.inquiries){
            return this.inquiries;
        } else {
            return false;
        }
    }
    
    accessibleFields = () => {
        const rInfo = {};
        for(const[key, value] of Object.entries(this)){
            rInfo[key] = value;
        }

        return rInfo;
    }

}

