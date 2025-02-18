import { useEffect, useState } from "react";

const useLocalStorage = <T>(
  key: string,
  initialState: T,
): [state: T, setState: React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState<T>(() => {
    const storageValue = localStorage.getItem(key);
    if (storageValue) return JSON.parse(storageValue);
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
};

export default useLocalStorage;
