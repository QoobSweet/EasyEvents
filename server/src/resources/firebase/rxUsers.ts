import firebase from './firebase.js';
import { collectionData } from 'rxfire/firestore';

const inquiriesRef = firebase.firestore().collection('users');


export default collectionData(inquiriesRef, 'id');