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
            noteBody: values.note_body, noteColor: values.note_color, notePriority: values.note_priority, noteSenderId: values.note_sender_id,
            noteTitle: values.note_title, noteUserId: values.note_user_id}
        
    };
    // private int noteSenderId;
    // private int noteUserId;
    // private String noteTitle;
    // private String noteBody;
    // private String noteColor;
    // private String noteIcon;
    // private int notePriority;
    //     note_body: ""
    // note_color: ""
    // note_image: ""
    // note_priority: "1"
    // note_sender_id: 1
    // note_title: ""
    // note_user_id: undefined
    if (values.note_image != "") {
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
function updateNote(note) {
    // debugger;
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cache': 'no-cache'
        },
        body: JSON.stringify({
            noteId: note.noteId, noteColor: note.noteColor, notePriority: note.notePriority, 
            noteTitle: note.noteTitle, noteRead: true})
        
    };
    // private int noteId;
    // private Boolean noteRead;
    // private String noteTitle;
    // private String noteBody;
    // private String noteColor;
    // private String noteIcon;
    // private int notePriority;
    return fetch(`${data.apiUrl}/notes/update`, requestOptions).then(handleResponse)
            .then(response => {
                console.log(response);
                return response;
            });
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