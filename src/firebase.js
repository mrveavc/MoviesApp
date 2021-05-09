import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"


const app = firebase.initializeApp({
    apiKey: "AIzaSyAUGhx6D5AA7PCLkoTrfMvjmRsoK-ur1hI",
    authDomain: "moviesapp-5abef.firebaseapp.com",
    databaseURL: "https://moviesapp-5abef-default-rtdb.firebaseio.com",
    projectId: "moviesapp-5abef",
    storageBucket: "moviesapp-5abef.appspot.com",
    appId: "1:573440273140:web:eac9aaeb0e7035e7d90ca1",
    messagingSenderId: "573440273140"
})

export const auth = app.auth()
export const firestore = app.firestore()

export default app