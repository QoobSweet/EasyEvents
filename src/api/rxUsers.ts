import firebase from 'firebase';
import {collectionData} from 'rxfire/firestore';

const inquiriesRef = firebase.firestore().collection('users');


export default collectionData(inquiriesRef, 'id');