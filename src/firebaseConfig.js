import * as firebase from 'firebase';
import 'firebase/database';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'PUT_YOUR_CONFIGURATION_HERE',
  authDomain: 'PUT_YOUR_CONFIGURATION_HERE',
  databaseURL: 'PUT_YOUR_CONFIGURATION_HERE',
  projectId: 'PUT_YOUR_CONFIGURATION_HERE',
  storageBucket: 'PUT_YOUR_CONFIGURATION_HERE',
  messagingSenderId: 'PUT_YOUR_CONFIGURATION_HERE',
  appId: 'PUT_YOUR_CONFIGURATION_HERE',
  measurementId: 'PUT_YOUR_CONFIGURATION_HERE',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase.firestore();
