import React, {Fragment} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {withRouter} from 'react-router-dom';
import Axios from 'axios';
import Navbar from '../navbar/Navbar';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      padding: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: "black",
      color: "orange",
      boxShadow: '0px 0px 10px blue'
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: "orange",
      color: "black"
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(2),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: "orange",
      color: "black"
    },
    loginlink: {
        color: "orange",
        cursor: "pointer"
    },
    textbox: {
        backgroundColor: "white",
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            border: "3px solid orange",
            borderRadius: "none"
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "5px solid orange",
            borderRadius: "none"
          },
    },
  }));

const SignUp = (props) => {
    const classes = useStyles();
    const handleClick = (option) => {
        if(option === 'login') {
            props.history.push('/login');
        }
    }
    const handleSignUp = () => {
      const fname = document.getElementById('firstName').value;
      const lname = document.getElementById('lastName').value;
      const name = fname + " " + lname;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      if(fname && lname && email && password) {
        const userDetails = {name,email,password};
        Axios.post('/auth/signup',userDetails)
          .then(res => {
            console.log(res.data.message);
            props.history.push('/login');
          })
          .catch(err => {
            console.log(err);
          })
      }
    }
    return (
      <Fragment>
        <Navbar option='SignUp'/>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <div className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    placeholder="First Name"
                    required
                    fullWidth
                    id="firstName"
                    className={classes.textbox}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    autoComplete="lname"
                    className={classes.textbox}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    placeholder="Email eg: abcd@gmail.com"
                    name="email"
                    autoComplete="email"
                    className={classes.textbox}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    placeholder="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    className={classes.textbox}
                  />
                </Grid>
              </Grid>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSignUp}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                    <div className={classes.loginlink} onClick={() => handleClick('login')}>
                        Already have an account? Log in
                    </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </Container>
      </Fragment>
      );
}

export default withRouter(SignUp);