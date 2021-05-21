import cClient from './client';
import cInquiry from './inquiry';
import cEvent from './event';
export const Definitions = {
    Client: cClient,
    Inquiry: cInquiry,
    Event: cEvent
};
export const createUser = (userId, userType) => {
    return { id: userId, userType: userType };
};
