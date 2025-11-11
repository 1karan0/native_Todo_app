import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: `${process.env.PROJECT_ID}.firebaseapp.com`,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.PROJECT_NUMBER,
  appId: process.env.APP_ID,
};


export { firestore, auth };
