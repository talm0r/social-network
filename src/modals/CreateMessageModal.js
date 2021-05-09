import { Button, Modal, } from "react-bootstrap";
import { useState, useEffect } from "react";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import StarsComponent from "../components/Helpers/StarsComponent";
import ColorPickerComponent from "../components/Helpers/ColorPickerComponent";
import ImageUploaderComponent from "../components/Helpers/ImageUploaderComponent";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useSelector, useDispatch } from 'react-redux'
import { notesActions } from "../actions/notes.action";
import { userActions } from "../actions/user.action";

function CreateMessageModal({ note }) {
    const useStyles = makeStyles(theme => ({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),

        },
        dense: {
            marginTop: theme.spacing(2),
        },
        menu: {
            width: 200,
        },
    }));

    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [showImageUploader, setShowImageUploader] = useState(note);
    const [headerColor, setheaderColor] = useState(note?.noteColor);
    const [userToMessage, setUserToMessage] = useState();
    const [errorMessage, setErrorMessage] = useState();




    const allUsers = useSelector((state) => {
        return state.user.allUsers;
    })

    const user = useSelector((state) => {
        return state.auth.user;
    })
    const handleOnSelect = (item) => {
        
        setValues({ ...values, "userId":item.userId});
        setUserToMessage(item);
    }

    const cancelUserSelect = () => {
        setUserToMessage(null);
    }

    useEffect(() => {
        if (allUsers === undefined) {
            dispatch(userActions.getAll());
        }
    }, []);

    const classes = useStyles();
    const dispatch = useDispatch();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleShowImageUploader = () => setShowImageUploader(!showImageUploader);

    const [values, setValues] = React.useState({
        noteTitle: note?.noteTitle ? note.noteTitle : '',
        noteBody: note?.noteBody ? note.noteBody : '',
        note_priority: note?.notePriority ,
        note_color: note?.noteColor,
        noteIcon: note?.noteIcon,
        noteSenderId: '',
        userId: note?.noteUserId ? note.noteUserId : '',
    });

    const handleChange = name => event => {
        
        setValues({ ...values, [name]: event.target.value });
    };

    const handleSubmit = () => {
       
        if (values.userId === '') {
            setErrorMessage("Select user to message");
            return;
        }
        if (values.noteTitle?.length < 3) {
            setErrorMessage("Note title has to be atleast 3 characters long");
            return;
        }
        if (values.noteBody.length < 5) {
            setErrorMessage("Note body has to be atleast 5 characters long");
            return;
        }
        if (values.note_priority == undefined) {
            setErrorMessage("Please choose priority");
            return;
        }

        if (values.note_color == undefined) {
            setErrorMessage("Choose color");
            return;
        }
  

        setLoading(true);
        if (note !== undefined) {
            values.noteId = note.noteId
            dispatch(notesActions.updateNote(values))
            setLoading(false);
            setShow(false);
            return;
        }
        values.noteUserId = userToMessage?.userId;
        values.noteSenderId = user?.userId;
        dispatch(notesActions.addNote(values))
        setTimeout(() => {
            setLoading(false);
            setShow(false);
        }, 1000);

    }

    const handleCallback = function (type, value) {
        if (type && value) {
            setValues({ ...values, [type]: value });
            if (type === 'note_color') {
                setheaderColor(value);
            }
        }
        return;
    }
    return (
        <>
            <span onClick={handleShow}>

                <h5>{note ? note.noteTitle : "Send Message"} </h5>
            </span>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header style={{ backgroundColor: headerColor }} closeButton>
                    <Modal.Title>{note ? <span> Edit Message sent to {(note.getterFirstName || '') + " " + (note.getterLastName || '')}  </span> : "Send Message"} {userToMessage ? (<span> To {userToMessage.userFirstName} {userToMessage.userLastName}</span>) : null}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form className={classes.container} noValidate autoComplete="off">
                        <div className="w-100">
                            {
                                !userToMessage && !note ? (
                                    <div className="w-100 mb-5" >
                                        <h4>Search user by email\name</h4>
                                    </div>
                                )
                                    : ''
                            }
                            {note ? null :
                                <ReactSearchAutocomplete
                                    items={allUsers}
                                    fuseOptions={{ keys: ["userEmail", "userFirstName", "userLastName"] }}
                                    resultStringKeyName="userEmail"
                                    onSelect={handleOnSelect}

                                    maxResults={6}
                                    styling={{ zIndex: '100' }}
                                    autoFocus
                                />}

                        </div>
                        {
                            userToMessage ? (
                                <div className="w-100">

                                    <div className="w-100 flex mt-5 align-items-center justify-content-between" >
                                        <div className="symbol symbol-60 symbol-xxl-100 mr-5   ">
                                            <div className="symbol-label" >
                                                <img src={userToMessage.userImage} className="h-75  " alt="" />
                                            </div>
                                        </div>
                                        <div>
                                            <span className="font-weight-bolder font-size-h5 text-dark-75 text-hover-primary">{userToMessage.userFirstName + " " + userToMessage.userLastName}</span>
                                            <div className="text-muted text-capitalize">{userToMessage.userRole}</div>
                                            <div className="text-muted text-capitalize">{userToMessage.userLocation}</div>
                                        </div>
                                        <div>
                                            <span className="font-weight-bolder font-size-h5 text-dark-75 text-hover-primary">Phone Number</span>
                                            <div className="text-muted text-capitalize">{userToMessage.userPhone}</div>

                                        </div>
                                        <div className="pr-0 text-right">
                                            <span onClick={cancelUserSelect} className="btn btn-light-danger font-weight-bolder font-size-sm">Cancel</span>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        }
                        <TextField
                            id="outlined-name"
                            label="Title"
                            className={classes.textField, "col-sm-12"}
                            value={values.noteTitle}
                            onChange={handleChange('noteTitle')}
                            margin="normal"
                            variant="outlined"
                            required={true}
                        />
                        <TextField
                            id="outlined-multiline-static"
                            label="Body"
                            multiline
                            rows="4"
                            value={values.noteBody}
                            className={classes.textField, "col-sm-12"}
                            onChange={handleChange('noteBody')}
                            margin="normal"
                            variant="outlined"
                            required={true}
                        />
                        <div className="row col-sm-12 text-center flex-center ">
                            <label className="col-sm-12"><h5>Priority</h5></label>
                            <StarsComponent priority={values.note_priority} isEditAble={true} parentCallback={handleCallback} />
                        </div>

                        <div className="row col-sm-12 mt-5 text-center flex-center">
                            <label className="col-sm-12"><h5>Choose Color</h5></label>
                            <ColorPickerComponent parentCallback={handleCallback} />
                        </div>
                        <div className="row col-sm-12 mt-5 text-center flex-center mt-5">
                            <img src={note?.noteIcon} className="max-w-100px  " alt="" />
                        </div>

                        <div className="row col-sm-12 mt-5 text-center flex-center mt-5">
                            <label className="col-sm-12">
                                <h5>
                                    {note ?
                                        <span onClick={handleShowImageUploader}> Change Image? </span> :
                                        'Add Image'}
                                </h5>
                            </label>
                            {showImageUploader ? '' : <ImageUploaderComponent parentCallback={handleCallback} />}

                        </div>
                        <h3>{errorMessage ? errorMessage : ''}</h3>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-secondary font-weight-bold px-9 py-4 my-3" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={handleSubmit} className="btn btn-primary font-weight-bold px-9 py-4 my-3">
                        {note ? 'Save Changes ' : 'Send Message '}
                        {loading && <span className="ml-3 spinner spinner-white"></span>}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}

export default CreateMessageModal;
