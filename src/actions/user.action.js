import { userConstants } from '../constants/user.constants';
import { userService } from '../services/user.service';
import { alertActions } from '../actions/alert.actions';
import { notesActions } from './notes.action';

export const userActions = {
    login,
    logout,
    getAll,
    signUp,
    edit
};

function login(username, password) {
    return dispatch => {
        userService.login(username, password)
            .then(
                response => { 
                    if(response.status === 200) {
                       let user = response.result;
                      
                       dispatch(notesActions.getInbox());
                       dispatch(notesActions.getOutbox());
                       dispatch(getAll());
                        dispatch(success(user));
                        dispatch(alertActions.success(response.message));
                    }
                    else {
                        dispatch(alertActions.error(response.message));
                    }
                },
                error => {
                    dispatch(alertActions.error(error));
                }
            );
    };
   
}

function signUp(values) {
    
    return dispatch => {
      return userService.signUp(values).then(response => {
          
          if(response.status === 200) {
              let user = response.result;
            dispatch(success(user));
          }
      });
    };
}
 function edit(user) {
    return  dispatch => {
       userService.editUser(user).then(response => {
        if (response === undefined) return;
        let user = response.result;
         dispatch(success(user));
        dispatch({type:userConstants.UPDATE_USER,payload: user})
       })
    };
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function getAll() {
    return dispatch => {
        userService.getAll()
            .then(
                users => { 
                    // Created for ReactSearchAutoComplete (needs id)
                    for(let i = 0; i<users.result.length; i++) {
                        users.result[i].id = i;
                    }
                     dispatch({type:userConstants.GETALL_USERS,payload: users.result})},
            );
    };
}
export function success(user) {  return { type: userConstants.LOGIN_SUCCESS, user } }