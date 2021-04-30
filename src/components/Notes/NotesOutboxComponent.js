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


function NotesOutboxComponent() {
    
    const dispatch = useDispatch();
   
   const outbox =  useSelector( (state) => {
        
        return state.notes.outbox;
    } ) 
    const newArray = outbox?.slice().reverse();
    const user =  useSelector( (state) => {
    
        return state.auth.user;
    } ) 
    const allUsers =  useSelector( (state) => {
    
        return state.user.allUsers;
    } ) 
    const test = () => {
        dispatch(userActions.logout());
    }
  
    useEffect(() => {
      if(outbox  == undefined) {
        dispatch(notesActions.getOutbox());
      }
      },[]);
   
    
  
    return (

        <div className="flex justify-content-center">
            <div className="card card-custom gutter-b col-sm-12">

                <div className="card-header border-0 py-5">
                    <h3 className="card-title align-items-start flex-column">
                        <span    className="card-label font-weight-bolder text-dark">Outbox </span>
                        <span className="text-muted mt-3 font-weight-bold font-size-sm">Total Sent Messages - {outbox?.length}  </span>
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
                                        <th className="text-center" >Sent to</th>
                                        <th className="text-center">Sent</th>
                                        <th className="text-center">Priority</th>
                                        <th className="text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                newArray?.map(function (singleNote, index) {
                                    return (
                                        <NoteItemComponent key={singleNote.noteId} singleNote={singleNote} inbox={false}/>
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

export default NotesOutboxComponent;
