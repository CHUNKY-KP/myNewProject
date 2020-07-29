import React from "react";

import "firebase/database";
import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCfyvPQPv22ZgMlOGkXf9QsMyvvSq_-DA",
  authDomain: "test-db-3b59a.firebaseapp.com",
  databaseURL: "https://test-db-3b59a.firebaseio.com",
  projectId: "test-db-3b59a",
  storageBucket: "test-db-3b59a.appspot.com",
  messagingSenderId: "281313369645",
  appId: "1:281313369645:web:94e4d815703a521a7fa2a4",
  measurementId: "G-73LMGFT52P"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig); 
  }
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const firedb = firebase.database();