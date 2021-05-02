import data from '../data/data';
import { authHeader } from '../helpers/auth-header';
import { history } from '../helpers/history';
import { requestHeaders } from '../constants/requestHeaders.constants';
export const userService = {
    login,
    signUp,
    logout,
    getAll,
    editUser
};

function login(loginDto) {
    
    const requestOptions = createRequestOptions("POST", requestHeaders.CONTENT_JSON, loginDto)
    return fetch(`${data.apiUrl}/user/login`, requestOptions)
        .then(handleResponse)
        .then(response => {
            localStorage.setItem('user', JSON.stringify(response.result));
            return response;
        });
}

function signUp(signUpDto) {
    const requestOptions = createRequestOptions("POST", requestHeaders.CONTENT_JSON, signUpDto)
    return fetch(`${data.apiUrl}/user/signup`, requestOptions)
        .then(handleResponse)
        .then(response => {
            localStorage.setItem('user', JSON.stringify(response.result));
            return response;
        });
}
function editUser(user) {
    const requestOptions = createRequestOptions("PUT", requestHeaders.CONTENT_JSON, user)
    return fetch(`${data.apiUrl}/user/update`, requestOptions)
    .then(handleResponse)
    .then(response => {
      console.log(response);
        return response;
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    history.go('/')
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${data.apiUrl}/user/getAllUsers`, requestOptions).then(handleResponse).then(response => {
        return response;
    });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function createRequestOptions(method, headers, body) {
    const requestOptions = {
        method: method,
        headers: headers,
        body: JSON.stringify(body)
    };

    return requestOptions;
}