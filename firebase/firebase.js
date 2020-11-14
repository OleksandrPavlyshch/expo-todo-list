import * as firebase from "firebase";

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCHTWeAADBl5Mb-szj6U3ppwqR4_SwEVas",
    authDomain: "expo-todo-list.firebaseapp.com",
    databaseURL: "https://expo-todo-list.firebaseio.com",
    projectId: "expo-todo-list",
    storageBucket: "expo-todo-list.appspot.com",
    messagingSenderId: "422314520990",
    appId: "1:422314520990:web:9b5b648ed98e37b9c6a68f",
};



export const FirebasrSDK = firebase.initializeApp(firebaseConfig);
