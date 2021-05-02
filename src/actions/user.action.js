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
// getOutbox,
// getInbox,
// setReadFlag,
// updateNote,
// addNote,
function login(username, password) {
   
    return dispatch => {
      
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                response => { 
                    if(response.status === 200) {
                       let user = response.result;
                      
                       dispatch(notesActions.getInbox());
                       dispatch(notesActions.getOutbox());
                       dispatch(getAll());
                        dispatch(success(user));
                       
                    }
                    else {
                        console.log(response.message);
                        dispatch(failure(response.message));
                        dispatch(alertActions.error(response.message));
                    }
                },
                error => {
                    console.log("Error");
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function signUp(values) {
    return dispatch => {
       userService.signUp(values);
    };
}
function edit(user) {
    // console.log(user);
    return dispatch => {
       userService.editUser(user);
       dispatch({type:"UPDATEUSER",payload: user})
    };
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function getAll() {
    return dispatch => {
        dispatch(request());
       

        userService.getAll()
            .then(
                users => { 
                    // Created for ReactSearchAutoComplete (needs id)
                    for(let i = 0; i<users.result.length; i++) {
                        users.result[i].id = i;
                    }
                     dispatch({type:"GETALLUSERS",payload: users.result})},
                error => { 
                    dispatch(failure(error));
                    dispatch(alertActions.error(error))
                }
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    // function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}