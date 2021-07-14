import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBXKJ1UC3EZXi8mAz3ZK1wVWIrBUYq6CN8",
    authDomain: "to-do-list-87f0f.firebaseapp.com",
    projectId: "to-do-list-87f0f",
    storageBucket: "to-do-list-87f0f.appspot.com",
    messagingSenderId: "51237206812",
    appId: "1:51237206812:web:9ab744cae337c7b39958d9",
  };

firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();

export default db;