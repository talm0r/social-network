import { userConstants } from '../constants/user.constants';

export default function userReducer(state = {}, action) {
   
    switch (action.type) {
   
    case "GETALLUSERS":
      
        return {
        allUsers: action.payload
        };
    case userConstants.GETALL_FAILURE:
        return { 
        error: action.error
        };
    default:
        return state
    }
}
// export default function userReducer(currentState = {}, action) {
         

//         switch(action.type) {
//             case "SIGNIN":  
//                 return {
//                     ...currentState,
//                     user: action.payload
//                 }
//             default:
//                 return currentState;
//         }
      
// }
