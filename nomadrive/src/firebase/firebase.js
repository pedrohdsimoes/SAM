// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAcMccAp0Anhu72CZKIGhoVHLvnzu98J3s",
    authDomain: "nomadrive-7f72f.firebaseapp.com",
    projectId: "nomadrive-7f72f",
    storageBucket: "nomadrive-7f72f.appspot.com",
    messagingSenderId: "991712815235",
    appId: "1:991712815235:web:4fe83588a06b0f80c693b6",
    measurementId: "G-YXNV7D65F8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;