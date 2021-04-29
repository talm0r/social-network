import { Button, Card, Modal, Nav } from "react-bootstrap";
import { useState } from "react";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import StarsComponent from "../components/Helpers/StarsComponent";
import ColorPickerComponent from "../components/Helpers/ColorPickerComponent";
import IconsComponent from "../components/Helpers/IconsComponent";
import ImageUploaderComponent from "../components/Helpers/ImageUploaderComponent";
import notes from "../data/notes";
import users from "../data/users";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useSelector, useDispatch } from 'react-redux'
import uploadFilesService from "../services/upload-files.service";
import { notesService } from "../services/notes.service";

function CreateMessageModal({ note }) {


    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results)
    }
    const allUsers = useSelector((state) => {

        return state.user.allUsers;
    })

    const user =  useSelector( (state) => {
    
        return state.auth.user;
    } ) 
    const handleOnSelect = (item) => {
        // the item selected
        console.log(item)
        setUserToMessage(item);
        
    }

    const handleOnFocus = () => {
        console.log('Focused')
    }
    const cancelUserSelect = () => {
        setUserToMessage(null);
    }
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

    const [show, setShow] = useState(false);
    const [headerColor, setheaderColor] = useState("#cddc39");
    const [userToMessage, setUserToMessage] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [values, setValues] = React.useState({
        note_title: '',
        note_body: '',
        note_priority: '1',
        note_color: '',
        note_image: '',
        note_sender_id: '',
        note_user_id:'',
    });
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };
    const handleSubmit = () => {
        console.log(values);
        console.log(userToMessage);
        values.note_user_id = userToMessage?.userId;
        values.note_sender_id = user?.userId;
        notesService.createNote(values);
        //  uploadFilesService.upload(values.note_image[0]).then((response) => {
        //          if(response.data.status == 200) {
        //              notesService.createNote(values);
        //          }
        //         })
    }
    const handleCallback = function (type, value) {
      
        if (type && value) {
            setValues({ ...values, [type]: value });
            if (type == 'note_color') {
                setheaderColor(value);
            }
     
        }

        return;

    }



    return (
        <>
            <span onClick={handleShow}>
                <h5>Send Message</h5>
            </span>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header style={{ backgroundColor: headerColor }} closeButton>
                    <Modal.Title>Send Message {userToMessage ? (<span> To {userToMessage.userFirstName} {userToMessage.userLastName}</span>) : null}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <IconsComponent /> */}

                    <form className={classes.container} noValidate autoComplete="off">
                        <div className="w-100">
                            {
                                !userToMessage ? (
                                    <div className="w-100 mb-5" >
                                        <h4>Search user by email\name</h4>
                                    </div>) : null}

                            <ReactSearchAutocomplete
                                items={allUsers}
                                onSearch={handleOnSearch}
                                fuseOptions={{ keys: ["userEmail", "userFirstName", "userLastName"] }}
                                resultStringKeyName="userEmail"
                                onSelect={handleOnSelect}
                                onFocus={handleOnFocus}
                                maxResults={6}
                                styling={{ zIndex: '100' }}
                                autoFocus
                            />
                        </div>
                        {
                            userToMessage ? (
                                <div className="w-100">

                                    <div className="w-100 flex mt-5 align-items-center justify-content-between" >
                                        <div className="symbol symbol-60 symbol-xxl-100 mr-5   ">
                                            <div className="symbol-label" >
                                                <img src={userToMessage.userImage}
                                                    //    onMouseOver={e => (e.currentTarget.src ="https://cdn1.iconfinder.com/data/icons/ui-color/512/Untitled-12-512.png")}
                                                    //         onMouseOut={e => (e.currentTarget.src = userToMessage.user_image)}

                                                    className="h-75  " alt="" />
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
                                            <a onClick={cancelUserSelect} className="btn btn-light-danger font-weight-bolder font-size-sm">Cancel</a>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        }
                        <TextField
                            id="outlined-name"
                            label="Title"
                            className={classes.textField, "col-sm-12"}
                            value={values.note_title}
                            onChange={handleChange('note_title')}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-multiline-static"
                            label="Body"
                            multiline
                            rows="4"
                            value={values.note_body}
                            className={classes.textField, "col-sm-12"}
                            onChange={handleChange('note_body')}
                            margin="normal"
                            variant="outlined"
                        />
                        <div className="row col-sm-12 text-center flex-center ">
                            <label className="col-sm-12"><h5>Priority</h5></label>
                            <StarsComponent isEditAble={true} parentCallback={handleCallback} />
                        </div>

                        <div className="row col-sm-12 mt-5 text-center flex-center">
                            <label className="col-sm-12"><h5>Choose Color</h5></label>
                            <ColorPickerComponent parentCallback={handleCallback} />
                        </div>
                        <div className="row col-sm-12 mt-5 text-center flex-center mt-5">
                            <label className="col-sm-12"><h5>Add Image</h5></label>
                            <ImageUploaderComponent parentCallback={handleCallback} />
                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Send Message
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}

export default CreateMessageModal;
