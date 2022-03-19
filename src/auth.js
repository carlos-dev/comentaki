/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword, getAuth, onAuthStateChanged, updateProfile, signOut,
} from 'firebase/auth';

export const AuthContext = createContext();

const auth = getAuth();

const useGetUser = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        updateProfile(currentUser, {
          displayName: 'Carlos',
        });
      } else {
        setUser(null);
      }
    });
  }, []);

  return user;
};

const useCreateUser = () => {
  const [state, setState] = useState({
    error: '',
    success: '',
  });
  const createUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      // Signed in
        if (userCredential) {
          setState({
            error: '',
            success: 'Usuário criado com sucesso',
          });
        }
      // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('errorCode', errorCode);
        console.log('errorMessage', errorMessage);
        setState({
          success: '',
          error: errorMessage,
        });
      // ..
      });
  };

  return [state, createUser];
};

const handleSignOut = () => {
  signOut(auth)
    .then(() => {
      console.log('Signed out');
    })
    .catch((error) => {
      console.log(error);
    });
};

export function AuthProvider({ children }) {
  const user = useGetUser();
  const [createUserState, createUser] = useCreateUser();

  return (
    <AuthContext.Provider value={{
      user,
      createUserState,
      createUser,
      handleSignOut,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}
