import firebase from './firebase.js';
import {collectionData} from 'rxfire/firestore/dist/index.cjs.js?';


const inquiriesRef = firebase.firestore().collection('inquiries');

export default collectionData(inquiriesRef, 'id');