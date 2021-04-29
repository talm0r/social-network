import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import { Drawer, MenuItem } from '@material-ui/core';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import InboxIcon from '@material-ui/icons/MoveToInbox';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },

}));
function HeaderComponent() {
    const dispatch = useDispatch();

    const notes = useSelector((state) => {

        return state.notes.notes;
    })
    const user = useSelector((state) => {

        return state.auth.user;
    })
    const [menu, setMenu] = useState(false)
   
    function handleToggle() {
        setMenu(!menu);
    }


   
    const classes = useStyles();
    return (
        <div>
            <AppBar position="static"  >
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleToggle}>
                        <MenuIcon  />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        The Social Media
                </Typography>
                    <Avatar  src={user.userImage} />
                </Toolbar>
            </AppBar>
            <Drawer  open={menu} onClose={handleToggle}>
                <MenuItem className="mb-3 ml-5 mt-5"><Link to="/inbox" ><InboxIcon />Inbox </Link></MenuItem>
                <MenuItem className="mb-3 ml-5 mt-5"><Link to="/outbox" ><InboxIcon />Outbox </Link></MenuItem>
                <MenuItem className="mb-3 ml-5 ">  <Link to="/edit" ><PermIdentityIcon/>Personal Information </Link></MenuItem>
                <MenuItem className="mb-3 ml-5 ">  <Link to="/changepassword" > <VpnKeyIcon/>Change Password </Link></MenuItem>
                <MenuItem className="mb-3 ml-5 ">  <Link to="/logout" > <MeetingRoomIcon />Logout </Link></MenuItem>

            </Drawer>
        </div>
       
    )

}

export default HeaderComponent;
