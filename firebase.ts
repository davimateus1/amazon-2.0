import firebase from 'firebase';

export const firebaseConfig = {
  apiKey: 'AIzaSyD_ry0Ojil0-Rldn1a7pUkqLjSA-gkaiEU',
  authDomain: 'amzn-2-0-davi.firebaseapp.com',
  projectId: 'amzn-2-0-davi',
  storageBucket: 'amzn-2-0-davi.appspot.com',
  messagingSenderId: '644137640704',
  appId: '1:644137640704:web:cbdfed7935b9b4fdcac9e5',
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();

export default db;
