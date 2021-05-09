import React from "react";
import { useSelector , useDispatch } from 'react-redux'
import {  NavLink } from "react-router-dom";
import { FaInbox , FaFacebookMessenger } from 'react-icons/fa';
import { BsFillPersonFill } from "react-icons/bs";
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { MdSecurity } from "react-icons/md";
import { userActions } from "../../actions/user.action";

function ProfileComponent ()  {
    const dispatch = useDispatch();
    const user =  useSelector( (state) => {
        return state.auth.user;
    } ) 
    const logout = () => {
        dispatch(userActions.logout());
    }
    
  return (
    <div className="flex-row-auto offcanvas-mobile " id="kt_profile_aside">
    
    <div className="card card-custom card-stretch">
        
        <div className="card-body pt-4">
            <div className="d-flex align-items-center">
                <div className="symbol symbol-60 symbol-xxl-100 mr-5 align-self-start align-self-xxl-center">
                    <div className="symbol-label" >
                    <img src={user.userImage} className="h-75 " alt="" />
                    </div>
                    {/* <i className="symbol-badge bg-success"></i> */}
                </div>
                <div>
                    <span  className="font-weight-bolder font-size-h5 text-dark-75 text-hover-primary">{user.userFirstName +" " + user.userLastName}</span>
                    <div className="text-muted">{user.userRole}</div>
                    <div className="mt-2">
                        {/* TODO - add chat \ follow option */}
                        <span  className="btn btn-sm btn-primary font-weight-bold mr-2 py-2 px-3 px-xxl-5 my-1">Chat</span>
                        <span  className="btn btn-sm btn-success font-weight-bold py-2 px-3 px-xxl-5 my-1">Follow</span>
                    </div>
                </div>
            </div>
            
            
            <div className="py-9">
                <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="font-weight-bold mr-2">Email:</span>
                    <span className="text-muted text-hover-primary">{user.userEmail}</span>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="font-weight-bold mr-2">Phone:</span>
                    <span className="text-muted">{user.userPhone}</span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                    <span className="font-weight-bold mr-2">Location:</span>
                    <span className="text-muted text-capitalize">{ user.userLocation}</span>
                </div>
            </div>
            
            <div className="navi navi-bold navi-hover navi-active navi-link-rounded">
                <div className="navi-item mb-2">
                    <NavLink activeClassName='is-active' to="/inbox">
                    <span href="custom/apps/profile/profile-1/overview.html" className="navi-link py-4 ">
                        <span className="navi-icon mr-2">
                            <span className="svg-icon">
                                <FaFacebookMessenger />
                            </span>
                        </span>
                        <span className="navi-text font-size-lg">Inbox</span>
                        <span className="navi-label">
                            {/* TODO - add unread messages counter */}
                            <span className="label label-light-danger label-rounded font-weight-bold">4</span>
                        </span>
                    </span>
                    </NavLink>
                </div>
                <div className="navi-item mb-2">
                    <NavLink activeClassName='is-active' to="/outbox">
                    <span href="custom/apps/profile/profile-1/overview.html" className="navi-link py-4 ">
                        <span className="navi-icon mr-2">
                            <span className="svg-icon">
                            <FaInbox />
                            </span>
                        </span>
                        <span className="navi-text font-size-lg">Outbox</span>
                        <span className="navi-label">
                        </span>
                    </span>
                    </NavLink>
                </div>
                <div className="navi-item mb-2">
                    <NavLink activeClassName='is-active' to="/edit"><span  className="navi-link py-4">
                        <span className="navi-icon mr-2">
                            <span className="svg-icon">
                          <BsFillPersonFill />
                            </span>
                        </span>
                        <span className="navi-text font-size-lg">Personal Information</span>
                    </span>
                    </NavLink>
                </div>
                <NavLink activeClassName='is-active' to="/changepassword">
                <div className="navi-item mb-2">
                    <span href="custom/apps/profile/profile-1/change-password.html" className="navi-link py-4">
                        <span className="navi-icon mr-2">
                            <span className="svg-icon">
                               <MdSecurity />
                            </span>
                        </span>
                        <span className="navi-text font-size-lg">Change Password</span>
                    </span>
                </div>
                </NavLink>
                <span  to="/logout">
                <div className="navi-item logoutButton mb-2">
                    <span href="custom/apps/profile/profile-1/change-password.html" className="navi-link py-4">
                        <span className="navi-icon mr-2">
                            <span className="svg-icon">
                               <MeetingRoomIcon />
                            </span>
                        </span>
                        <span className="navi-text font-size-lg" onClick={logout}>Logout</span>
                    </span>
                </div>
                </span>
            </div>
        </div>
    </div>
</div>
  );
};

export default ProfileComponent;