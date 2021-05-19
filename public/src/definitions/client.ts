

export default class Client {
    collectionKey = '';
    id = '';
    name = 'New Client';
    email = '';
    phone = '';
    inquiries = [];


    //if dataObj provided merge matching fields return Client Object
    static convertObject(dataObj: Object): Client{
        let client = new Client();
        for (const [key, value] of Object.entries(dataObj)) {
            client[key] = value;
        }
        return client;
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

    accessibleFields = (): Object => {
        return {
            //items will appear in the oder they are here
            name: this.name,
            phone:     this.phone,
            email:    this.email
        }
    }
}

