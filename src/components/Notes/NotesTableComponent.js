import { useEffect } from "react";
import React from 'react';
import CreateMessageModal from "../../modals/CreateMessageModal";
import NoteItemComponent from "./NoteItemComponent";
import { useSelector, useDispatch } from 'react-redux'
import { userActions } from '../../actions/user.action';
// import { authentication } from "../../reducers/authentication.reducer";
import { notesActions } from "../../actions/notes.action";
// import { notesConstants } from "../../constants/note.constants";


function NotesTableComponent() {

    const dispatch = useDispatch();
    const notes = useSelector((state) => {
        return state.notes.notes;
    })
    const outbox = useSelector((state) => {
        return state.notes.outbox;
    })
    const newArray = notes?.slice().reverse();
   
    const allUsers = useSelector((state) => {
        return state.user.allUsers;
    })
    const test = () => {
        dispatch(userActions.logout());
    }
    useEffect(() => {
        if (notes == undefined) {
            dispatch(notesActions.getInbox());
        }
        if (outbox == undefined) {
            dispatch(notesActions.getOutbox());
        }
        if (allUsers == undefined) {

            dispatch(userActions.getAll());
        }
    }, []);
    return (

        <div className="flex justify-content-center">
            <div className="card card-custom gutter-b col-sm-12">
                <div className="card-header border-0 py-5">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label font-weight-bolder text-dark">Inbox </span>
                        <span className="text-muted mt-3 font-weight-bold font-size-sm">Total Messages - {notes?.length}  </span>
                    </h3>
                    <div className="card-toolbar">
                        <span className="btn btn-info font-weight-bolder font-size-sm mr-3"><CreateMessageModal /></span>
                        <span onClick={test} className="btn btn-danger font-weight-bolder font-size-sm">Create Note</span>
                    </div>
                </div>


                <div className="card-body pt-0 pb-3">
                    <div className="tab-content">

                        <div className="table-responsive">
                            <table className="table table-head-custom table-head-bg table-borderless table-vertical-center">
                                <thead>
                                    <tr className="text-left text-uppercase">
                                        <th className="pl-7">
                                            <span className="text-dark-75">Title</span>
                                        </th>
                                        <th className="text-center" >Sender Name</th>
                                        <th className="text-center">Received</th>
                                        <th className="text-center">Priority</th>
                                        <th className="text-center">Read</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        newArray?.map(function (singleNote, index) {
                                            return (
                                                <NoteItemComponent key={singleNote.noteId} singleNote={singleNote} inbox={true} />
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
