// import { notesConstants } from '../constants/note.constants';

// import { alertActions } from '../actions/alert.actions';

import { notesService } from '../services/notes.service';


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
               dispatch({type:"GETALLINBOX",payload: tempNotes});
                },
                
            );
    // dispatch.success(allNotes)
    // dispatch(success(allNotes))
   }
    // function request() { return { type: notesConstants.GETALL_REQUEST } }
    // function success(notes) { return { type: notesConstants.GETALL_SUCCESS, notes } }
    // function failure(error) { return { type: notesConstants.GETALL_FAILURE, error } }
  
};
function getOutbox() {
    return dispatch => {
      notesService.getOutbox().then(
                 response => { 
                 let tempNotes = response.result;
                dispatch({type:"GETALLOUTBOX",payload: tempNotes});
                 },
             );
     // dispatch.success(allNotes)
     // dispatch(success(allNotes))
    }
    //  function request() { return { type: notesConstants.GETALL_REQUEST } }
    //  function success(notes) { return { type: notesConstants.GETALL_SUCCESS, notes } }
    //  function failure(error) { return { type: notesConstants.GETALL_FAILURE, error } }
   
 };


function updateNote(note) {
    return dispatch => {
        // return;
        notesService.updateNote(note)
        .then(
            response => { 
               
                if(response.status === 200) {
                   dispatch(getOutbox());
                   dispatch(getInbox());
                }
            })
       
    }
       
}
 function  addNote(note) {
    return dispatch => {
        console.log(note);
       notesService.createNote(note)
        .then(response => { 
            
                if(response.status === 200) {
                   dispatch(getOutbox());
                   dispatch(getInbox());
                }
            })
    }
}
function deleteNote(noteId) {
    console.log(noteId);
    return dispatch => {
        notesService.deleteNote(noteId).then(response => {
            dispatch({type:"DELETENOTE",payload: noteId});
        })
    }
}

function setReadFlag(noteId, status) {
   
    return dispatch => {
        notesService.setReadFlag(noteId,status)
        .then(
            response => { 
               
                if(response.status === 200) {
                   dispatch(getOutbox());
                   dispatch(getInbox());
                }
            })
       
    }
}
   
  
