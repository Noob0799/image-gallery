import React, { Component, Fragment } from 'react';
import {withRouter} from 'react-router-dom';
import styles from './Upload.module.css';
import {storage} from '../firebase/index';
import CircularProgress from '@material-ui/core/CircularProgress';
import Axios from 'axios';
import Navbar from '../navbar/Navbar';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            uploading: false
        }
    }

    getUploadedImage = () => {
        let uploadedsolution = '';
        const file = document.getElementById("uploadtask").files[0];
        if(file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                uploadedsolution = reader.result;
                this.setState({
                    image: uploadedsolution
                });
            };
            reader.readAsDataURL(file);
        }
    }

    handleUpload = () => {
        const name = document.getElementById('imgname').value;
        const image = document.getElementById("uploadtask").files[0];
        const date = new Date().toLocaleString();
        if(this.state.image && name) {
            this.setState({
                uploading: true
            });
            const imgname = name + new Date();
            const uploadTask = storage.ref(`images/${imgname}`).put(image);
            uploadTask.on('state_changed', 
            (snapshot) => {},
            (error) => {
                console.log('Firebase image upload error', error);
                this.setState({
                    uploading: false
                });
            },
            () => {
                storage.ref('images').child(imgname).getDownloadURL()
                    .then(url => {
                        console.log('URL', url);
                        const token = sessionStorage.getItem('token');
                        const tokenString = `Bearer ${token}`;
                        const imageData = {img: url,name,date};
                        Axios.post("http://localhost:5000/image/upload", imageData, { headers: { Authorization: tokenString } })
                            .then(res => {
                                console.log(res.data.message);
                                this.props.history.push('/view');
                            })
                            .catch(err => {
                                console.log(err);
                                this.setState({
                                    uploading: false
                                });
                            })

                    })
                    .catch(err => {
                        console.log(err);
                        this.setState({
                            uploading: false
                        });
                    })
            });
        }
    }


    render() {
        let element = <h2 style={{paddingTop: "10vh"}}>You have to login first...</h2>;
        if(sessionStorage.getItem('token')) {
            element = (
                <div className={styles.container}>
                    <div className={styles.text}>
                        <div className={styles.imagedetails}>
                            <label>Image Name:</label><br/>
                            <input type="text" id="imgname"/>
                        </div>
                    </div>
                    <div className={styles.imageupload}>
                        <label>Click to upload image</label><br/>
                        <input type="file" className={styles.uploadbtn + " btn btn-dark"} id="uploadtask" onChange={this.getUploadedImage}/>
                        {
                            this.state.image ? 
                            (
                                <div className={styles.imagepreview}>
                                    <img src={this.state.image} alt="Preview"/>
                                </div>
                            ) : null
                        }
                    </div>
                    <div className={styles.btn}>
                        <button className={styles.submitbtn + " btn btn-dark"} onClick={this.handleUpload}>Upload</button>
                    </div>
                </div>
            );
        }
        return (
            <Fragment>
                <Navbar option='Upload' token={sessionStorage.getItem('token')}/>
                {
                    this.state.uploading ?
                    (
                        <div className={styles.progress}>
                            <CircularProgress size="20vw"/>
                        </div>
                    ) :
                    element
                }
            </Fragment>
        )
    }
}

export default withRouter(Upload);
