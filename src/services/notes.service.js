import data from '../data/data';

import uploadFilesService from './upload-files.service';
export const notesService = {
    getInbox,
    createNote,
    updateNote,
    setReadFlag,
    getOutbox,
    deleteNote
};

function setReadFlag(noteId,status) {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cache': 'no-cache'
        },
        body:JSON.stringify( {
            noteId: noteId, noteRead: status
        })

    };
    return fetch(`${data.apiUrl}/notes/readNote`, requestOptions).then(handleResponse)
    .then(response => {
        return response;
    });
}


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

async function createNote(values) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cache': 'no-cache'
        },
        body: {
            noteBody: values.noteBody, noteColor: values.note_color, notePriority: values.note_priority, noteSenderId: values.noteSenderId,
            noteTitle: values.noteTitle, noteUserId: values.noteUserId
        }

    };


    if ((typeof (values.image) === "object")) {
        try {
            const response = await uploadFilesService.upload(values.image[0]);
           
           
            requestOptions.body.noteIcon  = response.result.url;
            requestOptions.body = JSON.stringify(requestOptions.body);
 
            return fetch(`${data.apiUrl}/notes/add`, requestOptions).then(handleResponse)
            .then(response => {
                return response;
            });
         }
         catch (error) {
             console.log(error);
         }
     
    }
      
    else {
        requestOptions.body = JSON.stringify(requestOptions.body);
        return fetch(`${data.apiUrl}/notes/add`, requestOptions).then(handleResponse)
            .then(response => {
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
            noteTitle: note.noteTitle,noteBody: note.noteBody, noteRead: true
        }

    };
    if ((typeof (note.image) === "object")) {
        try {
            const response = await uploadFilesService.upload(note.image[0]);
            requestOptions.body.noteIcon  = response.result.url;
            requestOptions.body = JSON.stringify(requestOptions.body);
           return fetch(`${data.apiUrl}/notes/update`, requestOptions).then(handleResponse)
        }
        catch (error) {
            console.log(error);
        }
    }
    else {
        try {
            requestOptions.body = JSON.stringify(requestOptions.body);
            return fetch(`${data.apiUrl}/notes/update`, requestOptions).then(handleResponse)
        }
        catch (error) {
            console.log(error);
        }
      
    }
}
function deleteNote(noteId) {
    const requestOptions = {
        method: 'DELETE',
    };
    return fetch(`${data.apiUrl}/notes/delete/`+noteId, requestOptions).then(handleResponse)
}


function handleResponse(response) {
    return response.json() 
    .then(response => {
      return response;
  });
  }
  
