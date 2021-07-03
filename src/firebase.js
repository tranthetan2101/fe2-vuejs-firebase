import firebase from '@firebase/app'
import 'firebase/firestore'
import 'firebase/firebase-auth'
import 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyCf_2NKq5TmKTCOZq02Erh9-V608AxhMhk",
    authDomain: "fe2-woo-3dbd1.firebaseapp.com",
    projectId: "fe2-woo-3dbd1",
    storageBucket: "fe2-woo-3dbd1.appspot.com",
    messagingSenderId: "785719929201",
    appId: "1:785719929201:web:f5cf7963d2efa9cc53eed0",
    measurementId: "G-E5B047L8BF"
};
const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export {fb,db};
