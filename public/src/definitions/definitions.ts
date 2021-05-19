import cClient from './client';
import cInquiry from './inquiry';
import cEvent from './event';

export const Definitions = {
  Client: cClient,
  Inquiry: cInquiry,
  Event: cEvent,
  EventStatusEnums: cEvent.statusEnums, 
}


export interface FormItem {
  collectionKey: String,
  dbKey: String,
  label: String,
  value: string
}

export interface User {
  id: String;
  userType: String;
}

export const createUser = (userId:String, userType: String): User => {
  return { id: userId, userType: userType}
}