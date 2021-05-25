export interface AccessData {
  value: string;
  type: "number" | "color" | "text" |
  "search" | "tel" | "url" | "email" |
  "password" | "date" | "month" |
  "week" | "time" | "datetime-local" | "select";
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