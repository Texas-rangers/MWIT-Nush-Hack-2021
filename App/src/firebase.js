import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCyRXiGD03qRW_FTwsnSzHGtr6k4UwOUQs",
    authDomain: "mwit-nush-hackathon-2021.firebaseapp.com",
    projectId: "mwit-nush-hackathon-2021",
    databaseURL: "https://mwit-nush-hackathon-2021-default-rtdb.asia-southeast1.firebasedatabase.app/",
    storageBucket: "mwit-nush-hackathon-2021.appspot.com",
    messagingSenderId: "253441629414",
    appId: "1:253441629414:web:20cf0409d07d8cf5f32f27"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
export const STR = firebaseApp.storage()

export const RTDB = firebaseApp.database()