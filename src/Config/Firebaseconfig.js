import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCB0gr_Wu-SixNjvFZIesoWSn9ZV9iVvgc",
  authDomain: "task-31d9f.firebaseapp.com",
  projectId: "task-31d9f",
  storageBucket: "task-31d9f.appspot.com",
  messagingSenderId: "633460583318",
  appId: "1:633460583318:web:cc887c71ea62cc8cf08bb7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);


export  {auth , firestore } ;
