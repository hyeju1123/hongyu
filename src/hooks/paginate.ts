import {useCallback, useState} from 'react';

type initialData<T> = {
  count: number;
  items: T[];
};

const LOAD_DATA_NUM = 20;

export default function Paginate<T>(initialData: T[]) {
  const [rendered, setRendered] = useState<initialData<T>>({
    count: LOAD_DATA_NUM,
    items: initialData.slice(0, LOAD_DATA_NUM),
  });

  const loadData = useCallback(
    (prevLength: number) => {
      prevLength < initialData.length &&
        setRendered(prev => ({
          count: prev.count + LOAD_DATA_NUM,
          items: initialData.slice(0, prev.count + LOAD_DATA_NUM),
        }));
    },
    [initialData],
  );

  return {rendered, loadData};
}
