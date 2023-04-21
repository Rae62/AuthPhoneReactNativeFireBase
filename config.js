import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

export const firebaseConfig = {
    apiKey: "AIzaSyA29h9emfgN9LTW1W4hp0FhD9YidpCPV5A",
    authDomain: "authphone-65a61.firebaseapp.com",
    projectId: "authphone-65a61",
    storageBucket: "authphone-65a61.appspot.com",
    messagingSenderId: "35454642491",
    appId: "1:35454642491:web:8c8f1b82186604a10b6f1e"
  };

  if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }