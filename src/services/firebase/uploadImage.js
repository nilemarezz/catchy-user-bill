import firebase from 'firebase/app'
import "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: "catchy-storage",
  storageBucket: process.env.REACT_APP_BUCKET,
  messagingSenderId: "325172537320",
  appId: "1:325172537320:web:b9828a2447396e31f8e65d"
};

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export { storage, firebase as default }