import React, { Fragment } from 'react';
import styles from './Landing.module.css';
import Button from '@material-ui/core/Button';
import {withRouter} from 'react-router-dom';

const Landing = (props) => {
    const handleClick = (option) => {
        if(option === 'login') {
            props.history.push('/login');
        } else if(option === 'signup') {
            props.history.push('/signup');
        }
    }
    return (
        <Fragment>
            <div className={styles.heading}>
                <span>Digi</span> Album
            </div>
            <div className={styles.subheading}>
                Store your precious moments here and access them anytime free of cost. Start by signing up with us.
            </div>
            <div className={styles.buttons}>
                <Button variant="contained" onClick={() => handleClick('login')}>Log In</Button>
                <Button variant="contained" onClick={() => handleClick('signup')}>Sign Up</Button>
            </div>
        </Fragment>
    )
}

export default withRouter(Landing);
