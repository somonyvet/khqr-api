// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAUo1C1u1lV56UwHGY_WpvSMy0x696vYss",
    authDomain: "light-cambodia.firebaseapp.com",
    projectId: "light-cambodia",
    storageBucket: "light-cambodia.firebasestorage.app",
    messagingSenderId: "834310696075",
    appId: "1:834310696075:web:ab3ccd490c353a67ccf88e",
    measurementId: "G-92SENLBTMP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;