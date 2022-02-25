import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAgIw9M_wPrKg4EOpMef1tCNhRsWG3xFqM',
  authDomain: 'comentaki-9302e.firebaseapp.com',
  projectId: 'comentaki-9302e',
  storageBucket: 'comentaki-9302e.appspot.com',
  messagingSenderId: '887040118889',
  appId: '1:887040118889:web:d8ec8c8bd6e2b7bcc792f8',
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
export default database;
