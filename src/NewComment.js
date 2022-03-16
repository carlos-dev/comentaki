import React, { useState } from 'react';
import { serverTimestamp } from 'firebase/database';
import { useDatabasePush } from './database';

export function NewComment() {
  const [, save] = useDatabasePush('comments');
  const [comment, setComment] = useState('');

  const createComment = () => {
    if (comment === '') return;

    save({
      content: comment,
      createdAt: serverTimestamp(),
      user: {
        id: '1',
        name: 'John Doe',
      },
    });

    setComment('');
  };

  return (
    <div>
      <textarea value={comment} onChange={(evt) => setComment(evt.target.value)} />
      <button
        type="button"
        onClick={createComment}
      >
        Comentar
      </button>
    </div>
  );
}
