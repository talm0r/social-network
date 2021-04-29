import { Button, Modal } from "react-bootstrap";
import { useState, useEffect, useMemo } from "react";
import React from 'react';
import ShowMessageModal from "../../modals/showMessageModal";

import Moment from "react-moment";
import ReactStars from "react-rating-stars-component";
import StarsComponent from "../Helpers/StarsComponent";
import users from "../../data/users";

import CreateMessageModal from "../../modals/CreateMessageModal";
import { useSelector, useDispatch } from 'react-redux'
import store from "../../store/store";
import { userActions } from '../../actions/user.action';
import { notesService } from "../../services/notes.service";
import { authentication } from "../../reducers/authentication.reducer";
import { notesActions } from "../../actions/notes.action";
import { notesConstants } from "../../constants/note.constants";
import ImageUploaderComponent from "../Helpers/ImageUploaderComponent";
import { TextField } from "@material-ui/core";
import Select from 'react-select'
import countryList from 'react-select-country-list'


function EditProfileComponent() {


    const handleChange = name => event => {
      
        
            setValues({ ...values, [name]: event.target.value });
      
   
       console.log(values);
        
    };
    const dispatch = useDispatch();

    const notes = useSelector((state) => {

        return state.notes.notes;
    })
    const user = useSelector((state) => {

        return state.auth.user;
    })

    const allUsers = useSelector((state) => {

        return state.user.allUsers;
    })
    const handleCallback = function (type, value) {

        // if (type && value) {
        //     setValues({ ...values, [type]: value });
        //     if (type == 'note_color') {
        //         setheaderColor(value);
        //     }

        // }

        return;

    }
    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])
    const changeHandler = value => {
        setValue(value)
      }
    // useEffect(() => {
    //     if (notes == undefined) {

    //         dispatch(notesActions.getAll());
    //     }
    //     if (allUsers == undefined) {

    //         dispatch(userActions.getAll());
    //     }

    // }, []);

    const [values, setValues] = React.useState({
        userFirstName: user.userFirstName,
        userLastName: user.userLastName,
        userImage: user.userImage,
        userRole: user.userRole,
        userPhone: user.userPhone,
        userLocation: user.userLocation,

    });


    return (

        <div className="flex-row-fluid ml-lg-8">

            <div className="card card-custom card-stretch">

                <div className="card-header py-3">
                    <div className="card-title align-items-start flex-column">
                        <h3 className="card-label font-weight-bolder text-dark">Personal Information</h3>
                        <span className="text-muted font-weight-bold font-size-sm mt-1">Update your personal informaiton</span>
                    </div>
                    <div className="card-toolbar">
                        <button type="reset" className="btn btn-success mr-2">Save Changes</button>
                        <button type="reset" className="btn btn-secondary">Cancel</button>
                    </div>
                </div>

                <form className="form">

                    <div className="card-body">
                        <div className="row">
                            <label className="col-xl-3"></label>
                            <div className="col-lg-9 col-xl-6">
                                <h5 className="font-weight-bold mb-6">Customer Info</h5>
                            </div>
                        </div>
                        <div className="form-group row">
                      
                            <label className="col-xl-3 col-lg-3 col-form-label">Avatar</label>
                            <div className="col-lg-9 col-xl-6">
                                {/* <div className="image-input image-input-outline" id="kt_profile_avatar" style="background-image: url(assets/media/users/blank.png)"> */}
                                <div className="image-input image-input-outline" id="kt_profile_avatar" >
                                    {/* <div className="image-input-wrapper" style="background-image: url(assets/media/users/300_21.jpg)"></div> */}

                                    <img className="max-w-100px" src={user.userImage} />
                                    <ImageUploaderComponent parentCallback={handleCallback} defaultImage={user.userImage} />


                                </div>
                                <span className="form-text text-muted">Allowed file types: png, jpg, jpeg.</span>
                            </div>
                        </div>
                        {/* <TextField
                            id="outlined-name"
                            label="Title"
                            // className={classes.textField, "col-sm-12"}
                            // value={values.note_title}
                            // onChange={handleChange('note_title')}
                            margin="normal"
                            variant="outlined"
                        /> */}
                        <div className="form-group row">
                            <label className="col-xl-3 col-lg-3 col-form-label">First Name</label>
                            <div className="col-lg-9 col-xl-6">
                                <input value={values.userFirstName} onChange={handleChange('userFirstName')} className="form-control form-control-lg form-control-solid" placeholder="First Name"  type="text" />
                            </div>
                        </div>
                       
                        <div className="form-group row">
                            <label className="col-xl-3 col-lg-3 col-form-label">Last Name</label>
                            <div className="col-lg-9 col-xl-6">
                                <input value={values.userLastName} onChange={handleChange('userLastName')} className="form-control form-control-lg form-control-solid" placeholder="Last Name"  type="text" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-xl-3 col-lg-3 col-form-label">Role</label>
                            <div className="col-lg-9 col-xl-6">
                                <input value={values.userRole} onChange={handleChange('userRole')} className="form-control form-control-lg form-control-solid" placeholder="Role" type="text" />
                                <span className="form-text text-muted">Say a few words about your role :)</span>
                            </div>
                        </div>
                        <div className="row">
                            <label className="col-xl-3"></label>
                            <div className="col-lg-9 col-xl-6">
                                <h5 className="font-weight-bold mt-10 mb-6">Contact Info</h5>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-xl-3 col-lg-3 col-form-label">Location</label>
                            <div className="col-lg-9 col-xl-6">
                            <div className="input-group input-group-lg input-group-solid">
                            <input type="text" className="form-control form-control-lg form-control-solid" placeholder="Location" value={values.userLocation} onChange={handleChange('userLocation')} />
                            </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-xl-3 col-lg-3 col-form-label"> Phone</label>
                            <div className="col-lg-9 col-xl-6">
                                <div className="input-group input-group-lg input-group-solid">

                                    <input value={values.userPhone} onChange={handleChange('userPhone')} type="text" className="form-control form-control-lg form-control-solid" placeholder="Phone" />
                                </div>

                            </div>
                        </div>
                      
                       
                        
                    </div>
                </form>
            </div>
        </div>

    )
}

export default EditProfileComponent;
