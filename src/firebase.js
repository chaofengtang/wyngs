import firebase from 'firebase'
import 'firebase/storage';

//should be in an env file, but I will leave it here for simplicity and functionality 
const config = {
  apiKey: "AIzaSyBsUZoeahdmZTfxUn23Xt-0Q-JWFGHUgj4",
  authDomain: "wyng-coding-assesment.firebaseapp.com",
  databaseURL: "https://wyng-coding-assesment.firebaseio.com",
  projectId: "wyng-coding-assesment",
  storageBucket: "wyng-coding-assesment.appspot.com",
  messagingSenderId: "509602502354"
};

firebase.initializeApp(config);
const storage = firebase.storage();
const database = firebase.database();



export {
  storage, database, firebase as default
}
