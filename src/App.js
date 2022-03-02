/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import {
  getDatabase, ref, onValue, goOffline, push, set,
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

function App() {
  const [, save] = useDatabasePush('comments');

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          save({
            content: 'Hello World',
            user: {
              id: '1',
              name: 'John Doe',
            },
          });
        }}
      >
        Toggle
      </button>
      status:
      {' '}
      <Comments />
    </div>
  );
}

export default App;
