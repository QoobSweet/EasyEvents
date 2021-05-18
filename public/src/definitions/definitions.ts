import cClient from './client';
import cInquiry from './inquiry';
import cEvent from './event';

export const Definitions = {
  Client: cClient,
  Inquiry: cInquiry,
  Event: cEvent,
  EventStatusEnums: cEvent.statusEnums, 
}

export interface DbObject {
  collectionKey: String;
  id: String;
}

export interface FormItem {
  collectionKey: String,
  dbKey: String,
  label: String,
  value: String
}

export interface User {
  id: String;
  userType: String;
}

export interface Client extends DbObject {
  id: String;
  name: String;
  email: String;
  phone: String | undefined;
  address: String;
  inquiries: Inquiry[];
}

export interface Inquiry extends DbObject {
  id: String;
  eventTitle: String;
  company: String;
  sourceLocation: String;
  dateRecieved: Date;
  eventStatus: String;
  room: String;
  guestCount: Number;
  startTime: Date;
  stopTime: Date;

  name: String;
  email: String;
  phone: String;

}

export const createUser = (userId:String, userType: String): User => {
  return { id: userId, userType: userType}
}