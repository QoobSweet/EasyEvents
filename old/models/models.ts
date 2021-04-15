export interface Country {
  name: string;
}
export interface State {
  name: string;
  country: Country;
}
export interface City {
  name: string;
  State: State;
}
export interface Address {
  streetName: string;
  country: Country;
  state: State;
  city: string;
  zipcode: number;
}


export interface Name {
  firstName: string;
  lastName: string;
}


export interface User {
  id: number;
  name: Name;
  password: string;
  outgoing_inquiries: Inquiries;
}

export interface CustomTimeRange {
  start_date: Date;
  start_time: number;
  end_date: Date;
  end_time: number;
}

export interface Inquiries {
  title: string;
  timeRange: CustomTimeRange;
  details: InquiryDetails;
  created_by_id: number;
  target_business_id: number;
}

export interface InquiryDetails {
  expected_head_count: number;
  catering_info: boolean;
  bar_info: boolean;
  dj_info: boolean;
  bakery_info: boolean;
  contact_preference: 'in-app' | 'email' | 'phone';
}


export interface Business {
  id: number;
  name: number;
  title: string;
  address: Address;
  ownders: User[];
  details: BusinessDetails;
}

export interface BusinessDetails {
  total_capacity: number;
  available_rooms: Room[];
}

export interface Room {
  business_id: number;
  name: string;
  capacity: number
}