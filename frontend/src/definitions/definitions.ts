export interface AccessData {
  label: string;
  value: string | {};
  type: "number" | "color" | "text" |
  "search" | "tel" | "url" | "email" |
  "password" | "date" | "month" |
  "week" | "time" | "datetime-local" | "select";
  options?: string[];
  positionIndex: Number;
}

export interface FormItem {
  label: String,
  data: AccessData
}

export interface User {
  id: String;
  userType: String;
}

export interface Coorespondence {
  messages: Message[];
}
export interface Message {
  dateTime: Date;
  message: string;
}


export const createUser = (userId:String, userType: String): User => {
  return { id: userId, userType: userType}
}


export const compressKey = (key) => {
  let _key = key.replace(' ', '').trim();
  return _key.charAt(0).toLowerCase() + _key.slice(1);
}

export const decompressKey = (key) => {
  let _key = key.replace(/([A-Z])/g, ' $1').trim();
  return (_key.charAt(0).toUpperCase() + _key.slice(1));
}