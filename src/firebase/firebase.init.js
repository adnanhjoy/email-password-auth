// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeKDoe6sdgshkLPw1sg1dzPTPGdtFIvVU",
  authDomain: "email-password-auth-926bb.firebaseapp.com",
  projectId: "email-password-auth-926bb",
  storageBucket: "email-password-auth-926bb.appspot.com",
  messagingSenderId: "633888078068",
  appId: "1:633888078068:web:26d2c7cbb8581e3aeb46a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app