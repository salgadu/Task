// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAl3hMOlvRufYyes_cCH5Rp9oIPKPGDIYo",
  authDomain: "task-2e93b.firebaseapp.com",
  projectId: "task-2e93b",
  storageBucket: "task-2e93b.appspot.com",
  messagingSenderId: "857068090850",
  appId: "1:857068090850:web:42dcc3ad2406ff1d7675bb"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()
const firestore = firebase.firestore()

export { auth, firestore };
