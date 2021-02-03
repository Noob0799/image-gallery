import React, { Fragment } from 'react';
import {withRouter} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      DigiAlbum{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
    '& span': {
        backgroundColor: 'black',
        color: 'orange',
        padding: '1vh 2vw',
        borderRadius: '10px'
    }
  },
  heroButtons: {
    marginTop: theme.spacing(4),
    '& button': {
        color: 'orange',
        backgroundColor: 'black',
        padding: '2vh 5vw',
    }
  },
  footer: {
    paddingTop: '20vh',
  },
}));

const Landing = (props) => {
    const handleClick = (option) => {
        if(option === 'login') {
            props.history.push('/login');
        } else if(option === 'signup') {
            props.history.push('/signup');
        }
    }
    const classes = useStyles();
    return (
        <Fragment>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                <CameraIcon className={classes.icon} />
                <Typography variant="h6" color="inherit" noWrap>
                    Digital Album
                </Typography>
                </Toolbar>
            </AppBar>
            <main>
                <div className={classes.heroContent}>
                <Container maxWidth="sm">
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Digi <span>Album</span>
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    Upload and store your favourite moments here and cherish them anytime you want to.Sign Up with us to get started.
                    </Typography>
                    <div className={classes.heroButtons}>
                    <Grid container spacing={2} justify="center">
                        <Grid item>
                        <button className="btn btn-dark" onClick={() => handleClick('login')}>Log In</button>
                        </Grid>
                        <Grid item>
                        <button className="btn btn-dark" onClick={() => handleClick('signup')}>Sign Up</button>
                        </Grid>
                    </Grid>
                    </div>
                </Container>
                </div>
            </main>
            <footer className={classes.footer}>
                <Copyright />
            </footer>
        </Fragment>
    )
}

export default withRouter(Landing);
