import ShowMessageModal from "../../modals/showMessageModal";
import React from 'react';
import Moment from "react-moment";
import StarsComponent from "../Helpers/StarsComponent";
import CreateMessageModal from "../../modals/CreateMessageModal";
function NoteItemComponent({ singleNote, inbox}) {

 


 
      return (
        <tr key={singleNote.noteId}>
            <td className="pl-0 py-8">
                <div className="d-flex align-items-center">
                    <div className="symbol symbol-50 symbol-light mr-4 ">
                    <span className="symbol-label rounded-image">
                        <img src={inbox ? (singleNote.userImage ? singleNote.userImage :"https://www.pikpng.com/pngl/m/80-805523_default-avatar-svg-png-icon-free-download-264157.png" ) : (singleNote.getterUserImage ? singleNote.getterUserImage : "https://www.pikpng.com/pngl/m/80-805523_default-avatar-svg-png-icon-free-download-264157.png" )} className="h-75 " alt="" />
                    </span>
                    </div>
                    <div>
                        <span  className="cursor-pointer text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">
                           {inbox ? <ShowMessageModal note={singleNote} /> :  <div> <CreateMessageModal note={singleNote}/></div>} 
                       
                            </span>
                        {/* <span className="text-muted font-weight-bold d-block">HTML, JS, ReactJS</span> */}
                    </div>
                </div>
            </td>
            <td> 
                {inbox ? (singleNote.userFirstName + " " + singleNote.userLastName) : (singleNote.getterFirstName + " " + singleNote.getterLastName)}
                {/* {singleNote.userFirstName + " " + singleNote.userLastName} */}
            </td>
            <td>
                <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                <Moment fromNow ago>{singleNote.noteCreated}</Moment> <span className="ml-1"> ago</span>
                     
                     </span>

            </td>
            <td>


                <StarsComponent priority={singleNote.notePriority} isEditAble={false}/>
            </td>

            {
            singleNote.noteRead ? (
                <td>
                <span className="label label-lg label-light-success label-inline">Read</span>
                </td>
                ):(
                <td>
                <span className="label label-lg label-light-danger label-inline">Unread</span>
                </td>)
                }
        </tr>
    )
}

export default NoteItemComponent
