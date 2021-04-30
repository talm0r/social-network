import data from '../data/data';
import { authHeader } from '../helpers/auth-header';
import { history } from '../helpers/history';
import { useSelector } from 'react-redux'
import uploadFilesService from './upload-files.service';
export const notesService = {
    getInbox,
    createNote,
    updateNote,
    getOutbox

};




function getInbox() {
    let user = JSON.parse(localStorage.getItem("user"));
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cache': 'no-cache'
        },
        body: JSON.stringify({ userId: user?.userId, token: user?.jwttoken })
    };

    return fetch(`${data.apiUrl}/notes/getUserNotes`, requestOptions).then(handleResponse)
        .then(response => {

            return response;
        });
}
function getOutbox() {
    let user = JSON.parse(localStorage.getItem("user"));
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cache': 'no-cache'
        },
        body: JSON.stringify({ userId: user?.userId, token: user?.jwttoken })
    };

    return fetch(`${data.apiUrl}/notes/getUserSentNotes`, requestOptions).then(handleResponse)
        .then(response => {

            return response;
        });
}

function createNote(values) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cache': 'no-cache'
        },
        body: {
            noteBody: values.noteBody, noteColor: values.note_color, notePriority: values.note_priority, noteSenderId: values.noteSenderId,
            noteTitle: values.noteTitle, noteUserId: values.note_user_id
        }

    };


    if ((typeof (values.note_image) === "object")) {
        uploadFilesService.upload(values.note_image[0]).then((response) => {
            if (response.data.status == 200) {
                console.log(requestOptions);
                requestOptions.body.noteIcon = response.data.result.url
                requestOptions.body = JSON.stringify(requestOptions.body);
                return fetch(`${data.apiUrl}/notes/add`, requestOptions).then(handleResponse)
                    .then(response => {
                        console.log(response);
                        return response;
                    });

            }
        })
    }
    else {
        requestOptions.body = JSON.stringify(requestOptions.body);
        return fetch(`${data.apiUrl}/notes/add`, requestOptions).then(handleResponse)
            .then(response => {
                console.log(response);
                return response;
            });
    }

}
async function updateNote(note) {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cache': 'no-cache'
        },
        body: {
            noteId: note.noteId, noteColor: note.note_color, notePriority: note.note_priority,
            noteTitle: note.noteTitle, noteRead: true
        }

    };
    if ((typeof (note.note_image) === "object")) {
        try {
           const response = await uploadFilesService.upload(note.note_image[0]);
           const json = await response.json();
           console.log(json);
           requestOptions.body.noteIcon  = json.result.url;
           requestOptions.body = JSON.stringify(requestOptions.body);

           return fetch(`${data.apiUrl}/notes/update`, requestOptions).then(handleResponse)
           .then(response => {

               console.log(response);
               return response;
           });
        }
        catch (error) {
            console.log(error);
        }
    }
    else {
        requestOptions.body = JSON.stringify(requestOptions.body);
        return fetch(`${data.apiUrl}/notes/update`, requestOptions).then(handleResponse)
            .then(response => {
                // debugger;
                console.log(response);
                return response;
            });
    }
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
 function uploadImage(image) {
    uploadFilesService.upload(image).then((response) => {
        if (response.data.status == 200) {

            return response.data.result.url;



        }
    })
}