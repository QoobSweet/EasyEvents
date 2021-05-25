import firebase from './firebase.js';
import {collectionData} from 'rxfire/firestore/dist/index.cjs.js';

const clientsRef = firebase.firestore().collection('clients');


export default collectionData(clientsRef, 'id');