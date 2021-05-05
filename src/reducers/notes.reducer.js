// export default function notesReducer(currentState =[], action) {


//     switch(action.type) {
//         case "dadsdsa":  
//             return {
//                 ...currentState,

//             }
//         default:
//             return currentState;
//     }

// }
import { notesConstants } from '../constants/note.constants';

export default function notesReducer(state = [], action) {


    switch (action.type) {
        case notesConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case "GETALLINBOX":
            return {
                ...state, 
                notes:  action.payload
            };
      
        case "GETALLOUTBOX":
            return {
                ...state,
                outbox: action.payload
            };
        case "READNOTE":
            console.log(action);
            // debugger;
            
            return {
                ...state,
                notes: 
            state.notes.map((item,index) => {
               if(action.payload.noteId == item.noteId) {
                  return {
                      ...item,
                      noteRead: true
                  }
                   
               }
              
               return item;
            })
        }
        case "DELETENOTE":
           
            return {
                ...state,
                outbox: 
            state.outbox.filter((item,index) => action.payload != item?.noteId)
              
            //    return item;
              
               
            
        }
        case "ADDEDNOTE":
         
            return {
                ...state, 
                notes: [...state.notes, action.payload]
            };
      
        case notesConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}