/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { getDatabase } from 'firebase/database';
import {
  getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged,
} from 'firebase/auth';

import './firebase';

import { NewComment } from './NewComment';
import { useDatabase } from './database';
import { Comments } from './Comments';

const auth = getAuth();
console.log(auth);
createUserWithEmailAndPassword(auth, 'carlos1@gmail.com', '123456')
  .then((userCredential) => {
    // Signed in
    const { user } = userCredential;
    console.log(userCredential);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('errorCode', errorCode);
    console.log('errorMessage', errorMessage);
    // ..
  });

// updateProfile(auth.currentUser, {
//   displayName: 'Carlos',
// }).then((response) => {
//   console.log('Updated', response);
// }).catch((error) => {
//   console.log(error);
// });

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('user', user.displayName);
    updateProfile(user, {
      displayName: 'Carlos',
    });
  }
});

function App() {
  return (
    <div>
      <NewComment />
      <Comments />
    </div>
  );
}

export default App;
