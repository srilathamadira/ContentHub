// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "contenthub-bfaa4.firebaseapp.com",
  projectId: "contenthub-bfaa4",
  storageBucket: "contenthub-bfaa4.firebasestorage.app",
  messagingSenderId: "861018704493",
  appId: "1:861018704493:web:5af3b1fd78f7f5ada3cd64",
  measurementId: "G-H1XRB214YN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export {app};