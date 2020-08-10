import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDC4Ca6RsLex5Bnvjvi7ckfOqq0e5p1naY",
    authDomain: "instagram-react-231f9.firebaseapp.com",
    databaseURL: "https://instagram-react-231f9.firebaseio.com",
    projectId: "instagram-react-231f9",
    storageBucket: "instagram-react-231f9.appspot.com",
    messagingSenderId: "660795577606",
    appId: "1:660795577606:web:52ab43f7189f76da5f3a87",
    measurementId: "G-7V4JC4KK9W"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };