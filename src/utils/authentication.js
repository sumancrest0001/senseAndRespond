import { v4 as uuidv4 } from 'uuid';

export const performLogin = ({email, password}) => {
    // we can put same UI validation here as well.
    const existingUsers = JSON.parse(localStorage.getItem('users'));
    const requestedUser = existingUsers.find(existingUser => existingUser.email === email);
    if(requestedUser) {
        if(requestedUser.password === password) {
        localStorage.setItem('loggedInUser', JSON.stringify({fullName: requestedUser.fullName, id: requestedUser.id, email: requestedUser.email}));
        // don not expose password
            return({fullName: requestedUser.fullName, id: requestedUser.id, email: requestedUser.email});
        } else {
            return('Password is not matching');
        }
    }
    return('User not found. Please register first');
}

export const performSignUp = (userDetails) => {
    const id = uuidv4();
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const requestedUser = existingUsers.find(existingUser => existingUser.email === userDetails.email);
    if(requestedUser) {
        return('User already exists. Please login');
    }
    localStorage.setItem('users', JSON.stringify([...existingUsers, {...userDetails, id}]));
    localStorage.setItem('loggedInUser', JSON.stringify({...userDetails, id}));
     // don not expose password
    return({fullName: userDetails.fullName, id, email: userDetails.email});
}

export const performLogOut = () => {
    localStorage.removeItem('loggedInUser');
}