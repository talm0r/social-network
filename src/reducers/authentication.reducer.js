import { userConstants } from '../constants/user.constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {user: {}};

export default function authentication(state = initialState, action) {
   
    switch (action.type) {
   
    case userConstants.LOGIN_SUCCESS:
        return {
        loggedIn: true,
        user: action.user
        };
    case "UPDATEUSER":
        return {
        ...state,
        user: {...state.user,...action.payload} 
        
        };
    case userConstants.LOGIN_FAILURE:
        return {};
    case userConstants.LOGOUT:
        localStorage.clear();
        return {};
    default:
        return state
    }
}