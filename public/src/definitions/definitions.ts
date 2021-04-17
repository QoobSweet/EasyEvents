
export interface User {
  id: String;
  userType: String;
}

export const createUser = (userId:String, userType: String): User => {
  return { id: userId, userType: userType}
}