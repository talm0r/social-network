import { userConstants } from '../constants/user.constants';
import { userService } from '../services/user.service';
import { alertActions } from '../actions/alert.actions';
import { history } from '../helpers/history';
import { notesService } from '../services/notes.service';
import { notesActions } from './notes.action';

export const userActions = {
    login,
    logout,
    getAll
};

function login(username, password) {
    return dispatch => {
        console.log(username);
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                response => { 
                    if(response.status == 200) {
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
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}