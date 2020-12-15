import firebase from 'firebase';

require('@firebase/firestore')
var firebaseConfig = {
  apiKey: "AIzaSyDSxc1QUpU4r9T1iEbuC2uHQSZFaR20HZI",
  authDomain: "booksanta-b4347.firebaseapp.com",
  databaseURL: "https://booksanta-b4347.firebaseio.com",
  projectId: "booksanta-b4347",
  storageBucket: "booksanta-b4347.appspot.com",
  messagingSenderId: "570463036159",
  appId: "1:570463036159:web:d24186b6ae5fd7cfc462ca"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
