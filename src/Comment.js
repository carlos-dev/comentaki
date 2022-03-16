/* eslint-disable react/prop-types */
import React from 'react';

export function Comment({ comment }) {
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
