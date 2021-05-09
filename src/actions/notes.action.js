import { notesService } from '../services/notes.service';
import { alertActions } from '../actions/alert.actions';
export const notesActions = {
    getOutbox,
    getInbox,
    setReadFlag,
    updateNote,
    addNote,
    deleteNote

};



function getInbox() {
    return dispatch => {
        notesService.getInbox().then(
            response => {

                let tempNotes = response.result;
                dispatch({ type: "GETALLINBOX", payload: tempNotes });
            },
        );
    }


};
function getOutbox() {
    return dispatch => {
        notesService.getOutbox().then(
            response => {
                let tempNotes = response.result;
                dispatch({ type: "GETALLOUTBOX", payload: tempNotes });
            },
        );
    }
};


function updateNote(note) {
    return dispatch => {
        notesService.updateNote(note)
            .then(
                response => {
                    if (response.status === 200) {
                        dispatch(getOutbox());
                        dispatch(getInbox());
                        dispatch(alertActions.success);
                    }
                    else {
                        dispatch(alertActions.error(response.message));
                    }
                })
    }
}
function addNote(note) {
    return dispatch => {
      
        notesService.createNote(note)
            .then(response => {
                if (response === undefined) return;
                if (response.status === 200) {
                    dispatch(getOutbox());
                    dispatch(getInbox());
                    dispatch(alertActions.success);
                } else {
                    dispatch(alertActions.error(response.message));
                }
            })
    }
}
function deleteNote(noteId) {
    console.log(noteId);
    return dispatch => {
        notesService.deleteNote(noteId).then(response => {
            dispatch({ type: "DELETENOTE", payload: noteId });
        })
    }
}

function setReadFlag(noteId, status) {

    return dispatch => {
        notesService.setReadFlag(noteId, status)
            .then(
                response => {
                    if (response.status === 200) {
                        dispatch(getOutbox());
                        dispatch(getInbox());
                    }
                })
    }
}


