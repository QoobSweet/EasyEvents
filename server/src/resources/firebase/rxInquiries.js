import firebase from './firebase.js';
import { collectionData } from 'rxfire/firestore';


const inquiriesRef = firebase.firestore().collection('inquiries');

export default collectionData(inquiriesRef, 'id');