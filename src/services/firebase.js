// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCvJftS-34Dafszma4MVelulrvPCgvaBu0",
    authDomain: "reactjs-pesce.firebaseapp.com",
    projectId: "reactjs-pesce",
    storageBucket: "reactjs-pesce.appspot.com",
    messagingSenderId: "426246385156",
    appId: "1:426246385156:web:f60ffb0a96783894bb4f51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app
