import React from 'react';
import { Comment } from './Comment';
import { useDatabase } from './database';

export function Comments() {
  const data = useDatabase('comments');

  if (!data) {
    return <p>Não há comentários</p>;
  }

  const ids = Object.keys(data);

  if (ids.length === 0) return <p>Carregando</p>;

  return ids.map((id) => <Comment key={id} comment={data[id]} />);
}
