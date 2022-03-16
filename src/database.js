import { useEffect, useState } from 'react';
import {
  ref, push, getDatabase, onValue, goOffline,
} from 'firebase/database';

const db = getDatabase();

export const useDatabase = (endpoint) => {
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

export const useDatabasePush = (endpoint) => {
  const [status] = useState(false);

  const save = (data) => {
    push(ref(db, endpoint), data);
  };

  return [status, save];
};
