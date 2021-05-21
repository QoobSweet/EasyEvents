export default class Client {
    constructor() {
        this.collectionKey = '';
        this.id = '';
        this.name = 'New Client';
        this.email = '';
        this.phone = '';
        this.inquiries = [];
        this.accessibleFields = () => {
            const accessField = (value, type) => {
                return { value: value, type: type };
            };
            return {
                //items will appear in the oder they are here
                name: accessField(this.name, 'text'),
                phone: accessField(this.phone, 'tel'),
                email: accessField(this.email, 'email')
            };
        };
    }
    //if dataObj provided merge matching fields return Client Object
    static convertObject(dataObj) {
        let client = new Client();
        for (const [key, value] of Object.entries(dataObj)) {
            client[key] = value;
        }
        return client;
    }
    setID(id) {
        this.id = id;
    }
    setName(name) {
        this.name = name;
    }
    setEmail(email) {
        this.email = email;
    }
    setPhone(phone) {
        this.phone = phone;
    }
    getInquiries() {
        if (this.inquiries) {
            return this.inquiries;
        }
        else {
            return false;
        }
    }
}
