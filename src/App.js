/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { getAuth } from 'firebase/auth';

import './firebase';

import { NewComment } from './NewComment';
import { Comments } from './Comments';
import { AuthProvider } from './auth';
import { CreateUser } from './CreateUser';
import { UserInfo } from './UserInfo';

const auth = getAuth();

// updateProfile(auth.currentUser, {
//   displayName: 'Carlos',
// }).then((response) => {
//   console.log('Updated', response);
// }).catch((error) => {
//   console.log(error);
// });

function App() {
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthProvider>
      <NewComment />
      <Comments />
      <CreateUser />
      <UserInfo />
    </AuthProvider>
  );
}

export default App;
