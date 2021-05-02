import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { userActions } from '../../actions/user.action';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Tal Mor - React Social Network App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const md5 = require('md5');
const useStyles = makeStyles(() => (
  
  {
  
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
  },
  form: {
    width: '100%',
  },
  loginBut: {
    fontSize: 16,
    cursor: 'pointer'
  },
}));

const initialValues = {
  userEmail: "",
  userPassword: "",
  userFirstName: "",
  userLastName: ""
}
export default function Login(props) {
  // const history = useHistory();
  // const URL = "http://localhost:8080/"
  // const { intl } = props;
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [signInOrSignUp, setSignInOrSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const handleSigningState = () => {
    setSignInOrSignUp(!signInOrSignUp);
  }
  const LoginSchema = Yup.object().shape({
    userEmail: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(),
      userPassword: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(),
      userFirstName: Yup.string()
      .min(2, "Minimum 2 letters for first name")
      .max(30, "Maximum 30 letters for first name")
      .required(),
      userLastName: Yup.string()
      .min(2, "Minimum 2 letters for last name")
      .max(30, "Maximum 30 letters for last name")
      .required()
  });
  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };
  const formik = useFormik({
    initialValues,
    // validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
     
      values.userPassword = md5(values.userPassword);
      if(signInOrSignUp) dispatch(userActions.signUp(values));
      else dispatch(userActions.login(values));
      disableLoading();
      setSubmitting(false);


    },
  });

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
          {signInOrSignUp ? (null) : ( <LockOutlinedIcon />)}
          </Avatar>
          <Typography component="h1" variant="h5">
            {signInOrSignUp ? ("Sign up") : ("Sign in")}
          </Typography>
          <form
            onSubmit={formik.handleSubmit}
            className="form fv-plugins-bootstrap fv-plugins-framework"
          >
            <div className="mb-10 alert alert-custom alert-light-info alert-dismissible mt-5">
              <div onClick={handleSigningState} className="alert-text ">
                {!signInOrSignUp ? (`Dont have an account? click here to sign up.`
                ) : `Already have an account? click here to sign in.`}
              </div>
            </div>
            {signInOrSignUp ? (
              <>
                <div className="form-group fv-plugins-icon-container">
                  <input
                    placeholder="First Name"
                    type="text"
                    className={`form-control form-control-solid h-auto py-5 px-6 
            `}
                    name="userFirstName"
                    {...formik.getFieldProps("userFirstName")}
                  />
                  {formik.touched.userFirstName && formik.errors.userFirstName ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">{formik.errors.userFirstName}</div>
                    </div>
                  ) : null}
                </div>
                <div className="form-group fv-plugins-icon-container">
                  <input
                    placeholder="Last Name"
                    type="text"
                    className={`form-control form-control-solid h-auto py-5 px-6 
           `}
                    name="userLastName"
                    {...formik.getFieldProps("userLastName")}
                  />
                  {formik.touched.userLastName && formik.errors.userLastName ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">{formik.errors.userLastName}</div>
                    </div>
                  ) : null}
                </div>
              </>
            ) : null}
            <div className="form-group fv-plugins-icon-container">
              <input
                placeholder="Email"
                type="email"
                className={`form-control form-control-solid h-auto py-5 px-6 
            `}
                name="userEmail"
                {...formik.getFieldProps("userEmail")}
              />
              {formik.touched.userEmail && formik.errors.userEmail ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formik.errors.userEmail}</div>
                </div>
              ) : null}
            </div>
            <div className="form-group fv-plugins-icon-container">
              <input
                placeholder="Password"
                type="password"
               autoComplete="new-password"
                className={`form-control form-control-solid h-auto py-5 px-6`}
                name="userPassword"
                {...formik.getFieldProps("userPassword")}
              />
              {formik.touched.userPassword && formik.errors.userPassword ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formik.errors.userPassword}</div>
                </div>
              ) : null}
            </div>
            <div>
              {!false ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{errorMessage}</div>
                </div>
              ) : null}
              <button

                type="submit"
                disabled={formik.isSubmitting}
                className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
              >
                <span>{signInOrSignUp ? ("Sign up") : ("Sign in")}</span>
                {loading && <span className="ml-3 spinner spinner-white"></span>}
              </button>
            </div>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}


