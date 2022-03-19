import { updateProfile } from 'firebase/auth';
import React, { useState, useContext } from 'react';

import { AuthContext } from './auth';

export function UserInfo() {
  const auth = useContext(AuthContext);

  if (!auth.user) return null;

  const { displayName } = auth.user;
  const [alternativeDisplayName] = auth.user.email.split('@');
  const dn = displayName || alternativeDisplayName;
  const [newDisplayName, setNewDisplayName] = useState(dn);

  const onChange = (evt) => {
    setNewDisplayName(evt.target.value);
  };

  const onSave = () => {
    if (newDisplayName === '') return;

    updateProfile(auth.user, {
      displayName: newDisplayName,
    }).then((response) => {
      console.log('Updated', response);
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <>
      <p>
        Olá
        {' '}
        {dn}
      </p>
      <input type="text" value={newDisplayName} onChange={onChange} />
      <button type="button" onClick={onSave}>Save displayName</button>
      <button type="button" onClick={auth.handleSignOut}>Sair</button>
    </>

  );
}
