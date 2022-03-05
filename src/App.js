/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import {
  getDatabase, ref, onValue, goOffline, push, serverTimestamp,
} from 'firebase/database';
import './firebase';

const db = getDatabase();

const useDatabase = (endpoint) => {
  const [data, setData] = useState({});

  const dataRef = ref(db, endpoint);
  useEffect(() => {
    onValue(dataRef, (snapshot) => {
      setData(snapshot.val());
    });

    return () => {
      goOffline(db);
    };
  }, [endpoint]);

  return data;
};

const useDatabasePush = (endpoint) => {
  const [status, setStatus] = useState(false);

  const save = (data) => {
    push(ref(db, endpoint), data);
  };

  return [status, save];
};

function Comment({ comment }) {
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

function Comments() {
  const data = useDatabase('comments');

  if (!data) {
    return <p>Não há comentários</p>;
  }

  const ids = Object.keys(data);

  if (ids.length === 0) return <p>Carregando</p>;

  return ids.map((id) => <Comment key={id} comment={data[id]} />);
}

function NewComment() {
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

function App() {
  return (
    <div>
      <NewComment />
      <Comments />
    </div>
  );
}

export default App;
