import React from 'react';

function ChangePasswordComponent() {
    const [values, setValues] = React.useState({
        userPassword: '',
        userNewPassword: '',
        userConfirmNewPassword: '',
    });
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
};
return (
    <div className="flex-row-fluid ml-lg-8">
  
    <div className="card card-custom">
     
        <div className="card-header py-3">
            <div className="card-title align-items-start flex-column">
                <h3 className="card-label font-weight-bolder text-dark">Change Password</h3>
                <span className="text-muted font-weight-bold font-size-sm mt-1">Change your account password</span>
            </div>
            <div className="card-toolbar">
                <button type="reset" className="btn btn-success mr-2">Save Changes</button>
                <button type="reset" className="btn btn-secondary">Cancel</button>
            </div>
        </div>
      
        <form className="form">
            <div className="card-body">
               
                <div className="alert alert-custom alert-light-danger fade show mb-10" role="alert">
                    <div className="alert-icon">
                        <span className="svg-icon svg-icon-3x svg-icon-danger">
                         
                            <svg xmlns="http://www.w3.org/2000/svg"  width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                    <rect x="0" y="0" width="24" height="24" />
                                    <circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10" />
                                    <rect fill="#000000" x="11" y="10" width="2" height="7" rx="1" />
                                    <rect fill="#000000" x="11" y="7" width="2" height="2" rx="1" />
                                </g>
                            </svg>
                          
                        </span>
                    </div>
                    <div className="alert-text font-weight-bold">Before changing your password, make sure no one is looking! </div>
                    <div className="alert-close">
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">
                                <i className="ki ki-close"></i>
                            </span>
                        </button>
                    </div>
                </div>
             
                <div className="form-group row">
                    <label className="col-xl-3 col-lg-3 col-form-label text-alert">Current Password</label>
                    <div className="col-lg-9 col-xl-6">
                        <input autoComplete="current-password" type="password" className="form-control form-control-lg form-control-solid mb-2" value={values.userPassword} onChange={handleChange('userPassword')} placeholder="Current password" />
                        
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-xl-3 col-lg-3 col-form-label text-alert">New Password</label>
                    <div className="col-lg-9 col-xl-6">
                        <input  autoComplete="new-password" type="password" className="form-control form-control-lg form-control-solid" value={values.userNewPassword} onChange={handleChange('userNewPassword')} placeholder="New password" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-xl-3 col-lg-3 col-form-label text-alert">Verify Password</label>
                    <div className="col-lg-9 col-xl-6">
                        <input type="password" className="form-control form-control-lg form-control-solid" value={values.userConfirmNewPassword} onChange={handleChange('userConfirmNewPassword')} placeholder="Verify password" />
                    </div>
                </div>
            </div>
        </form>
       
    </div>
</div>
)

}

export default ChangePasswordComponent;