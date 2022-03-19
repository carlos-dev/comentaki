/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { AuthContext } from './auth';

export function Comment({ comment }) {
  const auth = useContext(AuthContext);
  return (
    <div>
      {comment.content}
      {' '}
      por:
      {comment.user.name}
      {' '}
      em:
      {' '}
      {new Date(comment.createdAt).toLocaleString()}
    </div>
  );
}
