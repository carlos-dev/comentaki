import React, { useContext } from 'react';
import { AuthContext } from './auth';

export function CreateUser() {
  const auth = useContext(AuthContext);

  return (
    <>
      {JSON.stringify(auth.createUserState)}
      <button
        type="button"
        onClick={() => auth.createUser('carlos4@gmail.com', 'abc123')}
      >
        Salvar
      </button>
    </>
  );
}
