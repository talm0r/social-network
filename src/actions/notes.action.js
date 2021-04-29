import { notesConstants } from '../constants/note.constants';

import { alertActions } from '../actions/alert.actions';
import { history } from '../helpers/history';
import { notesService } from '../services/notes.service';


export const notesActions = {
  
    getInbox,
    updateNote,
    getOutbox
};



function getInbox() {
  
   return dispatch => {
     
     notesService.getInbox().then(
                response => { 
              
                let tempNotes = response.result;
               dispatch({type:"GETALLINBOX",payload: tempNotes});
             
               console.log(response.result);
               
                },
                
            );
    // dispatch.success(allNotes)
    // dispatch(success(allNotes))
   }
    function request() { return { type: notesConstants.GETALL_REQUEST } }
    function success(notes) { return { type: notesConstants.GETALL_SUCCESS, notes } }
    function failure(error) { return { type: notesConstants.GETALL_FAILURE, error } }
  
};
function getOutbox() {
  
    return dispatch => {
      
      notesService.getOutbox().then(
                 response => { 
               
                 let tempNotes = response.result;
                dispatch({type:"GETALLOUTBOX",payload: tempNotes});
              
                console.log(response.result);
                
                 },
                 
             );
     // dispatch.success(allNotes)
     // dispatch(success(allNotes))
    }
     function request() { return { type: notesConstants.GETALL_REQUEST } }
     function success(notes) { return { type: notesConstants.GETALL_SUCCESS, notes } }
     function failure(error) { return { type: notesConstants.GETALL_FAILURE, error } }
   
 };


function updateNote(note) {
    return dispatch => {
        console.log(note);
        notesService.updateNote(note);
        dispatch({type:"READNOTE",payload: note});
    }
       
}
    // return dispatch => {
    //     debugger;
    //     // dispatch(request());
    //     dispatch.success(allNotes)
    //     console.log("DISPATECHEDDTSDSD");
    //     // notesService.getAll(1,2)
    //     //     .then(
    //     //         response => {
    //     //              debugger 
    //     //             dispatch(success(response.result))
    //     //         },
    //     //         error => { 
    //     //             dispatch(failure(error));
    //     //             dispatch(alertActions.error(error))
    //     //         }
    //     //     );
    // };

  
