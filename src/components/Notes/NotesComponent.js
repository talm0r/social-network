import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import React from 'react';
import ShowMessageModal from "../../modals/showMessageModal";

import Moment from "react-moment";
import ReactStars from "react-rating-stars-component";
import StarsComponent from "../Helpers/StarsComponent";
import users from "../../data/users";
import notes from "../../data/notes";
import CreateMessageModal from "../../modals/CreateMessageModal";




function NotesComponent() {
  
    
    return (

        <div className="flex justify-content-center mt-5">
            <div className="card card-custom gutter-b col-sm-6">

                <div className="card-header border-0 py-5">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label font-weight-bolder text-dark">Inbox</span>
                        <span className="text-muted mt-3 font-weight-bold font-size-sm">Total Messages - {notes.length} </span>
                    </h3>
                    <div className="card-toolbar">
                        <a  className="btn btn-info font-weight-bolder font-size-sm mr-3"><CreateMessageModal /></a>
                        {/* <a href="localhost" className="btn btn-danger font-weight-bolder font-size-sm">Create Note</a> */}
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
                                        <th className="text-center">Sent</th>
                                        <th className="text-center">Priority</th>
                                        <th className="text-center">Read</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                notes.map(function (singleNote, index) {
                                    
                                })}

                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

            </div>
        </div>

    )
}

export default NotesComponent;
