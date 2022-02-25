/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import {
  getDatabase, ref, onValue, goOffline,
} from 'firebase/database';
import './firebase';

const db = getDatabase();

function Comments() {
  const [data, setData] = useState({});

  const dataRef = ref(db, 'test');
  useEffect(() => {
    onValue(dataRef, (snapshot) => {
      setData(snapshot.val());
    });

    return () => {
      goOffline();
    };
  }, []);

  return <pre>{JSON.stringify(data)}</pre>;
}

function App() {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <button type="button" onClick={() => setVisible(!visible)}>Toggle</button>
      {visible && <Comments />}
    </div>
  );
}

export default App;
