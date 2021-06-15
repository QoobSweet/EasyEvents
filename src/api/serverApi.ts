import firebase from "firebase";
import "@firebase/auth";
import "firebase/firestore";
import rxUsers from './rxUsers';
import rxClients from './rxClients';
import rxInquiries from './rxInquiries';
import { DbDoc } from "../definitions/dbDoc";
import { Observable } from "rxjs";
import { UserI } from "../definitions/definitions";

export interface ServerApi {
    rxUsers: Observable<unknown[]>;
    rxClients: Observable<unknown[]>;
    rxInquiries: Observable<unknown[]>;
    firestore: firebase.firestore.Firestore;
    getApiKey: { (): string };
    getConfig: { (callback: {(config: Object): void}): void };
    setFieldValue: { (collectionKey: string, docKey: string, fieldKey: string, fieldValue: unknown): void };
    removeDoc: { (user: UserI, collectionKey: string, docKey: string): void };
    createDoc: { (user: UserI, collectionKey: string, doc: DbDoc, callback: Function): void };
}

interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
}

const firebaseConfig: FirebaseConfig = {
    apiKey: "AIzaSyCW7Hj3REjJfdct86iEOx4De5KHXnH75Z4",
    authDomain: "quick-events-f2dab.firebaseapp.com",
    databaseURL: "https://quick-events-f2dab.firebaseio.com",
    projectId: "quick-events-f2dab",
    storageBucket: "quick-events-f2dab.appspot.com",
    messagingSenderId: "492433473730",
    appId: "1:492433473730:web:4bbc0e64f5b15de90d7b5b"
};

const ServerApi = (): ServerApi => {
    //add flexibility to retrieve our firebase instance no matter when/how ServerApi is created.
    const loadedFirebase = firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);
    const firestore = loadedFirebase.firestore();
    
    return {
        rxUsers: rxUsers,
        rxClients: rxClients,
        rxInquiries: rxInquiries,

        firestore: firestore,

        getApiKey: (): string => { return firebaseConfig.apiKey; },
        getConfig: (): FirebaseConfig => { return firebaseConfig; },

        setFieldValue: (collectionKey, docKey, fieldKey, fieldValue) => {
                //check for bindedData
            if(fieldKey !== 'id'){
                firestore.collection(collectionKey)
                .doc(docKey)
                .set({
                [fieldKey]: fieldValue
                }, {merge: true});
            }
        },

        removeDoc: (user, collectionKey, docKey) => { 
            console.log('removing Doc')

            //remove root client
            firestore.collection(collectionKey).doc(docKey).delete();
        
            //remove association to user
            let asocArray: string[] = [];
        
            if(user && user[collectionKey]){
              asocArray = user[collectionKey] as string[];
            }
            asocArray = asocArray.filter(e => e !== docKey);
        
            firestore.collection('users')
              .doc(user.id)
              .set({
                [collectionKey]: asocArray
              }, { merge: true });
        },

        createDoc: (user, collectionKey, doc, callback) => {
            if(doc){
                callback(new Promise((resolve) =>{
                    const docRef = firestore.collection(collectionKey).doc();
                    docRef.set(doc);
            
                    //create association to user
                    const asocArray = user[collectionKey] ? user[collectionKey] as string[] : [];
                    asocArray.push(docRef.id);
            
                    firestore.collection('users')
                    .doc(user.id)
                    .set({
                        [collectionKey]: asocArray
                    }, {merge: true})
                    
                    resolve(docRef);
                }));
            }
        }
    }
}

export default ServerApi;