import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyA8jyJ-zVG9QjpQQ0OZEQ31FmhSdD6JvGY',
  authDomain: 'meetups-b0f8e.firebaseapp.com',
  databaseURL: 'https://meetups-b0f8e.firebaseio.com',
  projectId: 'meetups-b0f8e',
  storageBucket: 'meetups-b0f8e.appspot.com',
  messagingSenderId: '106974835333',
  appId: '1:106974835333:web:7c3adf9929c0ad31762fe',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
