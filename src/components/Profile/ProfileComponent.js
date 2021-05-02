import React, { useState , useEffect } from "react";
import { useSelector  } from 'react-redux'
import { Link, NavLink } from "react-router-dom";
import  users from '../../data/users'
import { FaInbox , FaFacebookMessenger } from 'react-icons/fa';
import { BsFillPersonFill } from "react-icons/bs";

import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { MdSecurity } from "react-icons/md";

function ProfileComponent ()  {
//    const user = users[0];
    const user =  useSelector( (state) => {
    
        return state.auth.user;
    } ) 
    const notes =  useSelector( (state) => {
        
        return state.notes.notes;
    } ) 
    const [unreadMessages, setunreadMessages] = useState(0)
   


    // const countUnread = function() {
    //     console.log(notes);
    //     notes?.forEach(element => {
    //         console.log(element);
            
    //         console.log(element.noteRead);
    //          if(!element.noteRead) {
    //             setunreadMessages(unreadMessages + 1);
    //             console.log(unreadMessages);
    //          } 
           
    
    //     });
    // }
    
  return (
    <div className="flex-row-auto offcanvas-mobile " id="kt_profile_aside">
    
    <div className="card card-custom card-stretch">
        
        <div className="card-body pt-4">
            
           
            
            
            <div className="d-flex align-items-center">
                <div className="symbol symbol-60 symbol-xxl-100 mr-5 align-self-start align-self-xxl-center">
                    <div className="symbol-label" >
                    <img src={user.userImage} className="h-75 " alt="" />
                    </div>
                  
                    <i className="symbol-badge bg-success"></i>
                </div>
                <div>
                    <a href="#" className="font-weight-bolder font-size-h5 text-dark-75 text-hover-primary">{user.userFirstName +" " + user.userLastName}</a>
                    <div className="text-muted">{user.userRole}</div>
                    {/* <div className="mt-2">
                        <a href="#" className="btn btn-sm btn-primary font-weight-bold mr-2 py-2 px-3 px-xxl-5 my-1">Chat</a>
                        <a href="#" className="btn btn-sm btn-success font-weight-bold py-2 px-3 px-xxl-5 my-1">Follow</a>
                    </div> */}
                </div>
            </div>
            
            
            <div className="py-9">
                <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="font-weight-bold mr-2">Email:</span>
                    <a href="#" className="text-muted text-hover-primary">{user.userEmail}</a>
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
                            <span className="label label-light-danger label-rounded font-weight-bold">{unreadMessages}</span>
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
                <NavLink activeClassName='is-active' to="/logout">
                <div className="navi-item mb-2">
                    <span href="custom/apps/profile/profile-1/change-password.html" className="navi-link py-4">
                        <span className="navi-icon mr-2">
                            <span className="svg-icon">
                                
                               <MeetingRoomIcon />
                                
                            </span>
                        </span>
                        <span className="navi-text font-size-lg">Logout</span>
                      
                    </span>
                </div>
                </NavLink>
              
            </div>

             
        </div>
        
    </div>
    
</div>
  );
};

export default ProfileComponent;