import data from '../data/data';
import { authHeader } from '../helpers/auth-header';
import { history } from '../helpers/history';
export const userService = {
    login,
    logout,
    getAll
};

function login(email, password) {
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  userEmail: email, userPassword:password  })
    };

    return fetch(`${data.apiUrl}/user/login`, requestOptions)
        .then(handleResponse)
        .then(response => {
            //  store user details and jwt token in local storage to keep user logged in between page refreshes
                 localStorage.setItem('user', JSON.stringify(response.result));
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

    return fetch(`${data.apiUrl}/user/getAllUsers`, requestOptions).then(handleResponse) .then(response => {
     
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