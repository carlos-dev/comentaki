import React, { useContext, useState } from 'react';
import { serverTimestamp } from 'firebase/database';
import { useDatabasePush } from './database';
import { AuthContext } from './auth';

export function NewComment() {
  const [, save] = useDatabasePush('comments');
  const [comment, setComment] = useState('');
  const auth = useContext(AuthContext);
  console.log('auth', auth.user);
  if (!auth.user) return null;

  const { displayName, uid } = auth.user;
  const [alternativeDisplayName] = auth.user.email.split('@');

  const createComment = () => {
    if (comment === '') return;

    save({
      content: comment,
      createdAt: serverTimestamp(),
      user: {
        id: uid,
        name: displayName || alternativeDisplayName,
      },
    });

    setComment('');
  };

  return (
    <div>
      <textarea value={comment} onChange={(evt) => setComment(evt.target.value)} />
      <br />
      <button
        type="button"
        onClick={createComment}
      >
        Comentar
      </button>
    </div>
  );
}
