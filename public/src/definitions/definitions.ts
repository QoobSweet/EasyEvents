import cClient from './client';
import cInquiry from './inquiry';
import cEvent from './event';

export const Definitions = {
  Client: cClient,
  Inquiry: cInquiry,
  Event: cEvent,
  EventStatusEnums: cEvent.statusEnums, 
}



export interface AccessData {
  value: string;
  type: "number" | "color" | "text" |
  "search" | "tel" | "url" | "email" |
  "password" | "date" | "month" |
  "week" | "time" | "datetime-local";
}

export interface FormItem {
  collectionKey: String,
  dbKey: String,
  label: String,
  data: AccessData
}

export interface User {
  id: String;
  userType: String;
}

export const createUser = (userId:String, userType: String): User => {
  return { id: userId, userType: userType}
}