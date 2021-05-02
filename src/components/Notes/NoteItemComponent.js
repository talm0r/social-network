import ShowMessageModal from "../../modals/showMessageModal";
import React from 'react';
import Moment from "react-moment";
import StarsComponent from "../Helpers/StarsComponent";
import CreateMessageModal from "../../modals/CreateMessageModal";
import { isMobile } from 'react-device-detect';
function NoteItemComponent({ singleNote, inbox }) {
    return (
        <tr key={singleNote.noteId}>
            <td className="pl-0 py-8">
                <div className="d-flex align-items-center">
                    <div className="symbol symbol-50 symbol-light mr-4 ">
                        <span className="symbol-label rounded-image px-9">
                            <img src={inbox ? singleNote.userImage : singleNote.getterUserImage} className="h-100 rounded-image  " alt="" />
                        </span>
                    </div>
                    <div>
                        <span className="cursor-pointer text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">
                            {inbox ? <ShowMessageModal note={singleNote} /> : <div> <CreateMessageModal note={singleNote} /></div>}
                        </span>
                    </div>
                </div>
            </td>
            <td>
                {inbox ? (singleNote.userFirstName + " " + (singleNote.userLastName || '')) : (singleNote.getterFirstName + " " + (singleNote.getterLastName || ''))}
            </td>
            <td>
                <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                    <Moment fromNow ago>{singleNote.noteCreated}</Moment> <span className="ml-1"> ago</span>
                </span>
            </td>
            <td>
                {isMobile ? <span> {singleNote.notePriority}</span> : <StarsComponent priority={singleNote.notePriority} isEditAble={false} />}

            </td>
            <td>
                {
                    singleNote.noteRead ? (
                        <span className="label label-lg label-light-success label-inline">Read</span>
                    ) : (
                        <span className="label label-lg label-light-danger label-inline">Unread</span>
                    )
                }
            </td>
            {inbox ?
              (  null)
                : (<td>
                    <span  className="btn btn-danger font-weight-bolder font-size-sm">Delete </span>
                 </td>)
            }
            

        </tr>
    )
}

export default NoteItemComponent
