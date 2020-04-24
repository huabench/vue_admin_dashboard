import { firebase } from "@firebase/app";
import "@firebase/firestore";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAUvYMY4r9NE2xodcoy-MNJRVUXqq1l0IY",
    authDomain: "vue-hq-3bec3.firebaseapp.com",
    databaseURL: "https://vue-hq-3bec3.firebaseio.com",
    projectId: "vue-hq-3bec3",
    storageBucket: "vue-hq-3bec3.appspot.com",
    messagingSenderId: "876171047655",
    appId: "1:876171047655:web:6f69d120e8d646dbb06842",
    measurementId: "G-PWJW5S5FDL"
});

export const db = firebaseApp.firestore();
