import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyB_kPeP0bHlDzOFBvFiJ9pY55Qg-gdm7aQ",
    authDomain: "robinhood-8add0.firebaseapp.com",
    projectId: "robinhood-8add0",
    storageBucket: "robinhood-8add0.appspot.com",
    messagingSenderId: "597208502331",
    appId: "1:597208502331:web:fa9f787fc0e7b845bf0c1e"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export { db };
