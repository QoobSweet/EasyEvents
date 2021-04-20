import firebase from "@firebase/app"
import "@firebase/auth"
import "@firebase/firestore"
import { interval } from "rxjs";


export const firebaseConfig = {
    apiKey: "AIzaSyCW7Hj3REjJfdct86iEOx4De5KHXnH75Z4",
    authDomain: "quick-events-f2dab.firebaseapp.com",
    databaseURL: "https://quick-events-f2dab.firebaseio.com",
    projectId: "quick-events-f2dab",
    storageBucket: "quick-events-f2dab.appspot.com",
    messagingSenderId: "492433473730",
    appId: "1:492433473730:web:4bbc0e64f5b15de90d7b5b"
};

// Initialize Firebase
export default firebase.default.initializeApp(firebaseConfig);


const firebaseEntry = firebase.default.firestore();

 //firebase specific Methods
 export const firebaseMethods = {

  createDoc: (data, gUsers) => {
    console.log('creating Doc')

    if(data.doc){
      return new Promise((resolve, reject) =>{
        const docRef = firebaseEntry.collection(data.collectionKey).doc();
        docRef.set(data.doc);

        //create association to user
        const user = gUsers.filter((user) => user.id === data.userId)[0]
        const asocArray = (user && user[data.collectionKey]) ? user[data.collectionKey] : [];
        asocArray.push(docRef.id);

        firebaseEntry.collection('users')
          .doc(data.userId)
          .set({
              [data.collectionKey]: asocArray
          }, {merge: true})
        
        resolve(docRef);
      })
    }
  },

  removeDoc: (data, gUsers) => {
    console.log('removing Doc')

    //remove root client
    firebaseEntry.collection(data.collectionKey).doc(data.docKey).delete();

    //remove association to user
    const user = gUsers.filter((user) => user.id === data.userId)[0]
    let asocArray = [];

    if(user && user[data.collectionKey]){
      asocArray = user[data.collectionKey];
    }
    asocArray = asocArray.filter(e => e !== data.docKey);

    firebaseEntry.collection('users')
      .doc(data.userId)
      .set({
        [data.collectionKey]: asocArray
      }, {merge: true});
  },  

  setFieldValue: (data) => {
    console.log(data)

    //check for bindedData
    if(data.fieldKey !== 'id'){
      firebaseEntry.collection(data.collectionKey)
      .doc(data.docKey)
      .set({
        [data.fieldKey]: data.fieldValue
      }, {merge: true});
    }
  },

  getNewInstance: (socket, data, gUsers, gClients, gInquiries) => {
    return {
      userId: data.userId,
      userName: data.userName,

      sendClients: () => {
        const user = gUsers.filter((user) => user.id === data.userId)[0];
        const userClients = (user && user.clients) ? user.clients : [];
        const userClientsFull = gClients.filter(client => userClients.includes(client.id))
        
        console.log('sending clients');
        socket.emit('dbClients', {clients: userClientsFull}, (response) => {
          if (response.status === 'recieved') { console.log('clients Recieved') }
        });
      },
  
      sendInquiries: () => {
        const user = gUsers.filter((user) => user.id === data.userId)[0]
        const userInquiries = (user && user.inquiries) ? user.inquiries : [];
        const userInquiriesFull = gInquiries.filter(inquiry => userInquiries.includes(inquiry.id))

        socket.emit('dbInquiries', {inquiries: userInquiriesFull}, (response) => {
          if(response.status === 'recieved'){ console.log('inquiries Recieved'); }
        });
      }
    }
  }
}


