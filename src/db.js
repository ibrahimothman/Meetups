import firebase from './firebase';

const database = firebase.database();
const storage = firebase.storage();

export default {
  database,
  storage,
};
