import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
}));


const Navbar = (props) => {
    const classes = useStyles();
    const handleClick = (option) => {
        if(option === 'home') {
            props.history.push('/');
        } else if(option === 'upload') {
            props.history.push('/upload');
        } else if(option === 'view') {
            props.history.push('/view');
        } else if(option === 'login') {
            props.history.push('/login');
        } else if(option === 'signout') {
            sessionStorage.removeItem('token');
            props.history.push('/');
        }
    }
    let title = null, leftbutton = null, rightbutton = null;
    if(props.option === 'Login') {
        title = 'Login Page';
        leftbutton = <Button color="inherit" onClick={() => handleClick('home')}>Home</Button>;
        rightbutton = <Button color="inherit" onClick={() => handleClick('view')}>View</Button>;
        if(props.token) {
            rightbutton = <Button color="inherit" onClick={() => handleClick('signout')}>Sign Out</Button>;
        }
    } else if(props.option === 'SignUp') {
        title = 'SignUp Page';
        leftbutton = <Button color="inherit" onClick={() => handleClick('home')}>Home</Button>;
        rightbutton = <Button color="inherit" onClick={() => handleClick('view')}>View</Button>;
        if(props.token) {
            rightbutton = <Button color="inherit" onClick={() => handleClick('signout')}>Sign Out</Button>;
        }
    } else if(props.option === 'View') {
        title = 'Your images';
        leftbutton = <Button color="inherit" onClick={() => handleClick('upload')}>Upload</Button>;
        rightbutton = <Button color="inherit" onClick={() => handleClick('signout')}>Sign Out</Button>;
        if(!props.token) {
            rightbutton = <Button color="inherit" onClick={() => handleClick('login')}>Sign In</Button>;
        }
    } else if(props.option === 'Upload') {
        title = 'Upload an image';
        leftbutton = <Button color="inherit" onClick={() => handleClick('view')}>View</Button>;
        rightbutton = <Button color="inherit" onClick={() => handleClick('signout')}>Sign Out</Button>;
        if(!props.token) {
            rightbutton = <Button color="inherit" onClick={() => handleClick('login')}>Sign In</Button>;
        }
    }
    return (
        <Fragment>
            <AppBar position="static">
                <Toolbar>
                    {leftbutton}
                    <Typography variant="h6" className={classes.title}>
                    {title}
                    </Typography>
                    {rightbutton}
                </Toolbar>
            </AppBar>
        </Fragment>
    )
}

export default withRouter(Navbar);
