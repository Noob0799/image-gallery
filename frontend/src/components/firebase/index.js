import firebase from 'firebase/app';
import 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
    authDomain: "image-album-e0fc6.firebaseapp.com",
    projectId: "image-album-e0fc6",
    storageBucket: "image-album-e0fc6.appspot.com",
    messagingSenderId: "152213255045",
    appId: "1:152213255045:web:afc1f97fb3d5bf1f73caec",
    measurementId: "G-ZM3KSB1PRE"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export {storage, firebase as default};