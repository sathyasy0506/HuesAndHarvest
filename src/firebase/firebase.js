import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDtRrENtkJRlvzBUASeCg8hRRiQXJbzTtY",
  authDomain: "otp-hh.firebaseapp.com",
  projectId: "otp-hh",
  storageBucket: "otp-hh.firebasestorage.app",
  messagingSenderId: "344224939441",
  appId: "1:344224939441:web:a34db7a46276bf0ceed190",
  measurementId: "G-TQ29MKBTX1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
