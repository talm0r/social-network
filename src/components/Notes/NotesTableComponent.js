import { useEffect } from "react";
import React from 'react';
import CreateMessageModal from "../../modals/CreateMessageModal";
import NoteItemComponent from "./NoteItemComponent";
import { useSelector, useDispatch } from 'react-redux'
import { userActions } from '../../actions/user.action';
// import { authentication } from "../../reducers/authentication.reducer";
import { notesActions } from "../../actions/notes.action";
// import { notesConstants } from "../../constants/note.constants";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import { TableHead } from "@material-ui/core";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));
const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
});


function NotesTableComponent(props) {
   
   
    const dispatch = useDispatch();
    const notes = useSelector((state) => {
        return state.notes.notes;
    })
    const outbox = useSelector((state) => {
        return state.notes.outbox;
    })
    const newArray = notes?.slice().reverse();
    // const user = useSelector((state) => {
    //     return state.auth.user;
    // })
    const allUsers = useSelector((state) => {
        return state.user.allUsers;
    })
    const test = () => {
        dispatch(userActions.logout());
    }
    useEffect(() => {
        if (notes === undefined) {
            dispatch(notesActions.getInbox());
        }
        if (outbox === undefined) {
            dispatch(notesActions.getOutbox());
        }
        if (allUsers === undefined) {

            dispatch(userActions.getAll());
        }
    }, []);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, newArray?.length - page * rowsPerPage);
    return (
        <>
      
            <div className="flex justify-content-center">
                <div className="card card-custom gutter-b col-sm-12">
                    <div className="card-header border-0 py-5">
                        <h3 className="card-title align-items-start flex-column">
                            <span className="card-label font-weight-bolder text-dark">Inbox </span>
                            <span className="text-muted mt-3 font-weight-bold font-size-sm">Total Messages - {notes?.length}  </span>
                        </h3>
                        <div className="card-toolbar">
                            <span className="btn btn-info font-weight-bolder font-size-sm mr-3"><CreateMessageModal /></span>
                            <span onClick={test} className="btn btn-warning font-weight-bolder font-size-sm">Logout</span>
                        </div>
                    </div>
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table className="table table-head-custom table-head-bg table-borderless table-vertical-center" aria-label="custom pagination table">
                    <TableHead>
                        <tr className="text-left text-uppercase">
                            <th className="pl-7">
                                <span className="text-dark-75">Title</span>
                            </th>
                            <th className="text-center" >Sender Name</th>
                            <th className="text-center">Received</th>
                            <th className="text-center">Priority</th>
                            <th className="text-center">Read</th>
                          
                        </tr>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? newArray?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : notes
                        )?.map(function (singleNote, index) {
                            return (
                                <NoteItemComponent key={singleNote.noteId} singleNote={singleNote} inbox={true} />
                            )
                        })}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={newArray ? (newArray.length) :0}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
        // <div className="flex justify-content-center">
        //     <div className="card card-custom gutter-b col-sm-12">
        //         <div className="card-header border-0 py-5">
        //             <h3 className="card-title align-items-start flex-column">
        //                 <span className="card-label font-weight-bolder text-dark">Inbox </span>
        //                 <span className="text-muted mt-3 font-weight-bold font-size-sm">Total Messages - {notes?.length}  </span>
        //             </h3>
        //             <div className="card-toolbar">
        //                 <span className="btn btn-info font-weight-bolder font-size-sm mr-3"><CreateMessageModal /></span>
        //                 <span onClick={test} className="btn btn-danger font-weight-bolder font-size-sm">Create Note</span>
        //             </div>
        //         </div>


        //         <div className="card-body pt-0 pb-3">
        //             <div className="tab-content">

        //                 <div className="table-responsive">
        //                     <table className="table table-head-custom table-head-bg table-borderless table-vertical-center">
        //                         <thead>
        //                             <tr className="text-left text-uppercase">
        //                                 <th className="pl-7">
        //                                     <span className="text-dark-75">Title</span>
        //                                 </th>
        //                                 <th className="text-center" >Sender Name</th>
        //                                 <th className="text-center">Received</th>
        //                                 <th className="text-center">Priority</th>
        //                                 <th className="text-center">Read</th>
        //                             </tr>
        //                         </thead>
        //                         <tbody>
        //                             {
        //                                 newArray?.map(function (singleNote, index) {
        //                                     return (
        //                                         <NoteItemComponent key={singleNote.noteId} singleNote={singleNote} inbox={true} />
        //                                     )
        //                                 })
        //                             }
        //                         </tbody>
        //                     </table>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}

export default NotesTableComponent;
