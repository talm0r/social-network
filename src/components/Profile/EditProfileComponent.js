import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import ImageUploaderComponent from "../Helpers/ImageUploaderComponent";
import { userActions } from "../../actions/user.action";

function EditProfileComponent() {


    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };
    const dispatch = useDispatch();
    const user = useSelector((state) => {
        return state.auth.user;
    })


    const handleCallback = function (type, value) {
        setValues({ ...values, [type]: value });
    }
   
    const [values, setValues] = React.useState({
        userId: user.userId ? user.userId : '',
        userFirstName: user.userFirstName ? user.userFirstName : '',
        userLastName: user.userLastName ? user.userLastName : '',
        userImage: user.userImage ? user.userImage : '',
        userEmail: user.userEmail ? user.userEmail : '',
        userRole: user.userRole ? user.userRole : '',
        userPhone: user.userPhone ? user.userPhone : '',
        userLocation: user.userLocation ? user.userLocation : '',
    });
    const saveProfile = () => {
       dispatch(userActions.edit(values));
    }

    return (

        <div className="flex-row-fluid ml-lg-8">

            <div className="card card-custom card-stretch">

                <div className="card-header py-3">
                    <div className="card-title align-items-start flex-column">
                        <h3 className="card-label font-weight-bolder text-dark">Personal Information</h3>
                        <span className="text-muted font-weight-bold font-size-sm mt-1">Update your personal informaiton</span>
                    </div>
                    <div className="card-toolbar">
                        <button form="myForm" type="button" onClick={saveProfile} className="btn btn-success mr-2">Save Changes</button>
                        <button type="reset" className="btn btn-secondary">Cancel</button>
                    </div>
                </div>

                <form id="myForm"  className="form">

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
                                <div className="image-input image-input-outline" id="kt_profile_avatar" >
                                    <img alt="" className="max-w-100px" src={user.userImage} />
                                    <ImageUploaderComponent parentCallback={handleCallback} defaultImage={user.userImage} />
                                  
                                   
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-xl-3 col-lg-3 col-form-label">First Name</label>
                            <div className="col-lg-9 col-xl-6">
                                <input value={values.userFirstName} onChange={handleChange('userFirstName')} className="form-control form-control-lg form-control-solid" placeholder="First Name" type="text" />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-xl-3 col-lg-3 col-form-label">Last Name</label>
                            <div className="col-lg-9 col-xl-6">
                                <input value={values.userLastName} onChange={handleChange('userLastName')} className="form-control form-control-lg form-control-solid" placeholder="Last Name" type="text" />
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
                            <label className="col-xl-3 col-lg-3 col-form-label">E-Mail</label>
                            <div className="col-lg-9 col-xl-6">
                                <input value={values.userEmail} onChange={handleChange('userEmail')} className="form-control form-control-lg form-control-solid" placeholder="Last Name" type="text" />
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
