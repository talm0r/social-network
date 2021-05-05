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
//    debugger;
    return dispatch => {
      
        // dispatch(request({ username }));

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
                        console.log(response.message);
                        // dispatch(failure(response.message));
                        dispatch(alertActions.error(response.message));
                    }
                },
                error => {
                   
                    // dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    // function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function signUp(values) {
    debugger;
    return dispatch => {
       userService.signUp(values);
    };
}
function edit(user) {
    return dispatch => {
       userService.editUser(user);
        delete user.image
     
       dispatch({type:userConstants.UPDATE_USER,payload: user})
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
                error => { 
                    dispatch(failure(error));
                   
                }
            );
    };

   
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}