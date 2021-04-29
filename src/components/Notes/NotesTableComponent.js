import { Button, Modal } from "react-bootstrap";
import { useState , useEffect} from "react";
import React from 'react';
import ShowMessageModal from "../../modals/showMessageModal";

import Moment from "react-moment";
import ReactStars from "react-rating-stars-component";
import StarsComponent from "../Helpers/StarsComponent";
import users from "../../data/users";

import CreateMessageModal from "../../modals/CreateMessageModal";
import NoteItemComponent from "./NoteItemComponent";
import { useSelector , useDispatch } from 'react-redux'
import store from "../../store/store";
import { userActions } from '../../actions/user.action';
import { notesService } from "../../services/notes.service";
import { authentication } from "../../reducers/authentication.reducer";
import { notesActions } from "../../actions/notes.action";
import { notesConstants } from "../../constants/note.constants";


function NotesTableComponent() {
    // const [notes, setNotes] = useState([])
    // store.dispatch
    const dispatch = useDispatch();
    // hook to read data from redux
    // component will render when data changes
   const notes =  useSelector( (state) => {
        
        return state.notes.notes;
    } ) 
   const outbox =  useSelector( (state) => {
        
        return state.notes.outbox;
    } ) 
    const newArray = notes?.slice().reverse();
    const user =  useSelector( (state) => {
    
        return state.auth.user;
    } ) 
    const allUsers =  useSelector( (state) => {
    
        return state.user.allUsers;
    } ) 
    const test = () => {
      
        dispatch(userActions.logout());
        // fetch("http://localhost:8080/notes/getUserNotes")
        // .then(res => res.json()) 
        // .then(data => {
        //   console.log(data);
        // })
    }
  
    useEffect(() => {
      if(notes  == undefined) {
        dispatch(notesActions.getInbox());
      }
      if(outbox  == undefined) {
        dispatch(notesActions.getOutbox());
      }
      if(allUsers  == undefined) {
        
          dispatch(userActions.getAll());
      }
        // dispatch(notesActions.getAll());
        // notesService.getAll(user.userId,user.jwttoken).then(
        //         response => { 
        //         //  setNotes(response.result)
        //         let tempNotes = response.result;
        //        dispatch({type:"GETALLNOTES",payload: tempNotes});
        //         // dispatch(notesActions.getAll(tempNotes));
        //         // dispatch(type: notesConstants.NOTES_GETALL_SUCCESS,tempNotes)
        //        console.log(response.result);
               
        //         },
                
        //     );
      },[]);
   
    
    // let myNotes =  notesService.getAll(user.userId,user.jwttoken).then(
    //     response => { 
    //         let tempNotes = response.result;
    //      dispatch({ type: notesConstants.GETALL_SUCCESS, tempNotes })   
    //      console.log(response);
    //     },
        
    // );
    // console.log(myNotes);
  
    return (

        <div className="flex justify-content-center">
            <div className="card card-custom gutter-b col-sm-12">

                <div className="card-header border-0 py-5">
                    <h3 className="card-title align-items-start flex-column">
                        <span    className="card-label font-weight-bolder text-dark">Inbox </span>
                        <span className="text-muted mt-3 font-weight-bold font-size-sm">Total Messages - {notes?.length}  </span>
                    </h3>
                    <div className="card-toolbar">
                        <a   className="btn btn-info font-weight-bolder font-size-sm mr-3"><CreateMessageModal /></a>
                        <a onClick={test} className="btn btn-danger font-weight-bolder font-size-sm">Create Note</a>
                    </div>
                </div>


                <div className="card-body pt-0 pb-3">
                    <div className="tab-content">

                        <div className="table-responsive">
                            <table className="table table-head-custom table-head-bg table-borderless table-vertical-center">
                                <thead>
                                    <tr className="text-left text-uppercase">
                                        <th  className="pl-7">
                                            <span className="text-dark-75">Title</span>
                                        </th>
                                        <th className="text-center" >Sender Name</th>
                                        <th className="text-center">Sent</th>
                                        <th className="text-center">Priority</th>
                                        <th className="text-center">Read</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                newArray?.map(function (singleNote, index) {
                                    return (
                                        <NoteItemComponent key={singleNote.noteId} singleNote={singleNote}/>
                                    )
                                })
                                }


                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

            </div>
        </div>

    )
}

export default NotesTableComponent;
