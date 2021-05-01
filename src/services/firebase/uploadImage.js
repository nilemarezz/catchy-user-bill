import firebase from 'firebase/app'
import "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "catchy-storage.firebaseapp.com",
  projectId: "catchy-storage",
  storageBucket: "catchy-storage.appspot.com",
  messagingSenderId: "325172537320",
  appId: process.env.REACT_APP_APP_ID
};

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export { storage, firebase as default }