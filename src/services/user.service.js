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
    uploadImage
};

function login(loginDto) {

    const requestOptions = createRequestOptions("POST", requestHeaders.CONTENT_JSON, loginDto)
    return fetch(`${data.apiUrl}/user/login`, requestOptions)
        .then(handleResponse)
        .then(response => {
            if (response.status == 200) {
                localStorage.setItem('user', JSON.stringify(response.result));
            }

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
                
                return fetchToServer(requestOptions);
                
           
            });
    }
    else {
        return fetchToServer(requestOptions);
      
    }
    return;


}

function fetchToServer(requestOptions) {
    return fetch(`${data.apiUrl}/user/update`, requestOptions)
    .then(handleResponse)
    .then(response => {
        console.log(response);
        return response;
    });
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

async function uploadImage(image) {
    // debugger;
    const response = await uploadFilesService.upload(image);
    const json = await response.json();
    return json;
}