import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Moment from "react-moment";
import { useSelector, useDispatch } from 'react-redux'
import { notesActions } from "../actions/notes.action";
function ShowMessageModal({ note }) {

  const dispatch = useDispatch();
  const useStyles = makeStyles((theme) => ({

  }));

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => { 
    setShow(true) 
    // console.log(note);
   dispatch(notesActions.updateNote(note));
   
  };
  const placeHolder = note.noteTitle

  

 
  return (
    <>
      <span onClick={handleShow}>
        {placeHolder}
      </span>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ backgroundColor: note.noteColor }} closeButton>
          <Modal.Title className="text-capitalize">Inbox</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span className="card-label font-weight-bolder text-dark">Message From</span>
          <div className="flex flex-center justify-content-between">
            <div className="pl-0 py-8 ">
              <div className="d-flex align-items-center">
                <div className="symbol symbol-50 symbol-light mr-4">
                  <span className="symbol-label">
                    <img src={note.userImage} className="h-75 align-self-end" alt="" />
                  </span>
                </div>
                <div>
                  <a className="text-capitalize text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">{note.userFirstName + " " + note.userLastName}</a>
                  <span className="text-capitalize text-muted font-weight-bold d-block">{note.userRole}</span>
                </div>

              </div>
            </div>

            <div>
              <a className="text-capitalize text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">Location</a>
              <span className="text-capitalize text-muted font-weight-bold d-block">{note.userLocation}</span>
            </div>
            <div>
              <a className="text-capitalize text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">Phone</a>
              <span className="text-capitalize text-muted font-weight-bold d-block">{note.userPhone}</span>
            </div>


            <div className="pr-0 text-right">
              <a className="btn btn-light-success font-weight-bolder font-size-sm">Message back!</a>
            </div>
          </div>
          {/* <div class="card card-custom card-stretch gutter-b">
                                {note.noteBody}
                                </div> */}
          <div className="card card-custom gutter-b">
            <div className="card-header ">
              <div className="card-title ">
                <h3 className="card-label text-capitalize">
                  {note.noteTitle}

                </h3>
              
              </div>
              <div className="card-title ">
              <Moment format="D MMM YYYY">{note.noteCreated}</Moment>
              </div>
             
            </div>
            <div className="card-body ">
              <div className="font-size-h3 mb-5"> 
              {note.noteBody}
              </div>
             
              <div className="text-center">
              <img src={note.noteIcon} className="max-w-50  " alt="" />
              </div>
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Mark as unread
            </Button>
          <Button variant="primary" onClick={handleClose}>
           Close Message
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}

export default ShowMessageModal;
