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

function Comments({ visible }) {
  const endpoint = visible ? 'test' : 'test/a';
  const data = useDatabase(endpoint);

  return <pre>{JSON.stringify(data)}</pre>;
}

function App() {
  const [visible, setVisible] = useState(true);
  const [status, save] = useDatabasePush('test');

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setVisible(!visible);
          save({ a: 3, b: 4 });
        }}
      >
        Toggle
      </button>
      status:
      {' '}
      {status}
      <Comments visible={visible} />
    </div>
  );
}

export default App;
