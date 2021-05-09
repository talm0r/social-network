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
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { FaInbox , FaFacebookMessenger } from 'react-icons/fa';
import { BsFillPersonFill } from "react-icons/bs";

import { MdSecurity } from "react-icons/md";
import { userActions } from '../../actions/user.action';
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
    span: {
        color:"#3699FF",
    },
    logoutButton: {
        color:"#3699FF",
    }

}));
function HeaderComponent() {
    const dispatch = useDispatch();
    const user = useSelector((state) => {
        return state.auth.user;
    })
    const logout = () => {
        dispatch(userActions.logout());
    }
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
                <MenuItem className="mb-3 ml-5 mt-5"><Link to="/inbox" ><FaFacebookMessenger />Inbox </Link></MenuItem>
                <MenuItem className="mb-3 ml-5 "><Link to="/outbox" ><FaInbox />Outbox </Link></MenuItem>
                <MenuItem className="mb-3 ml-5 ">  <Link to="/edit" ><BsFillPersonFill/>Personal Information </Link></MenuItem>
                <MenuItem className="mb-3 ml-5 ">  <Link to="/changepassword" > <MdSecurity/>Change Password </Link></MenuItem>
                <MenuItem className="mb-3 ml-5 ">  <span className={classes.logoutButton}  onClick={logout} > <MeetingRoomIcon />Logout </span></MenuItem>
            </Drawer>
        </div>
    )
}

export default HeaderComponent;
