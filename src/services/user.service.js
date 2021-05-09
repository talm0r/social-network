import data from '../data/data';
import { authHeader } from '../helpers/auth-header';
import { history } from '../helpers/history';
import { requestHeaders } from '../constants/requestHeaders.constants';
import uploadFilesService from './upload-files.service';
export const userService = {
    login,
    signUp,
    logout,
    getAll,
    editUser,
};

/**
 * do login and save on localstorage for later use(get inbox\outbox with token)
 * @param {*} loginDto 
 * @returns user data
 */
function login(loginDto) {
    const requestOptions = createRequestOptions("POST", requestHeaders.CONTENT_JSON, loginDto)
    return fetch(`${data.apiUrl}/user/login`, requestOptions)
        .then(handleResponse)
        .then(response => {
            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(response.result));
            }
            return response;
        });
}

/**
 * do signup, then save on localstorage for later use(get inbox\outbox with token)
 * @param {*} signUpDto 
 * @returns user data
 */
function signUp(signUpDto) {
    const requestOptions = createRequestOptions("POST", requestHeaders.CONTENT_JSON, signUpDto)

    return fetch(`${data.apiUrl}/user/signup`, requestOptions)
        .then(handleResponse)
        .then(response => {
            if(response.status === 200) {
                localStorage.setItem('user', JSON.stringify(response.result));
            }
            return response;
        });
}
/**
 * Gets user object, check if user changed image, if so - upload image and update, if not just update details
 * @param {*} user 
 * @returns updated user
 */
async function editUser(user) {
    delete user.userImage;
    const requestOptions = createRequestOptions("PUT", requestHeaders.CONTENT_JSON, user)
    if ((typeof (user.image) === "object")) {
        await uploadFilesService.upload(user.image[0])
            .then((res) => {
                delete user.image;
                console.log(res.result.url);
                user.userImage = res.result.url;
                const requestOptions = createRequestOptions("PUT", requestHeaders.CONTENT_JSON, user)
                return userUpdateFetchToServer(requestOptions);
            });
    }
    else {
        return userUpdateFetchToServer(requestOptions);
    }
    return;
}
/**
 * Gets request options and fetching to server to update user data
 * @param {*} requestOptions 
 * @returns server response
 */
function userUpdateFetchToServer(requestOptions) {
    return fetch(`${data.apiUrl}/user/update`, requestOptions)
    .then(handleResponse)
   
}

function logout() {
    localStorage.removeItem('user');
    history.go('/')
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${data.apiUrl}/user/getAllUsers`, requestOptions).then(handleResponse)
}

function handleResponse(response) {
  return response.json() 
  .then(response => {
    return response;
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

