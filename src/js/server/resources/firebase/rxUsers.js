import firebase from './firebase.js';
import { collectionData } from 'rxfire/firestore/dist/index.cjs.js?';
const inquiriesRef = firebase.firestore().collection('users');
export default collectionData(inquiriesRef, 'id');
