import * as firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBkVe6ic-A3Bibbp5XKeLPZjYV_59c-GqI",
    authDomain: "gallery-e1684.firebaseapp.com",
    projectId: "gallery-e1684",
    storageBucket: "gallery-e1684.appspot.com",
    messagingSenderId: "1040254581158",
    appId: "1:1040254581158:web:aed79e4ef6a3f27607b767",
    measurementId: "G-VBG1CBEN0E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
export {storage};

