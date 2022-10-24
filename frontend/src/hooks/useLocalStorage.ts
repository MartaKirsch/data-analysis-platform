import { useCallback, useEffect, useState } from "react";

type UseLocalStorageArgs<T> = {
  initValue: T;
  transform?: (str: string) => T;
  key: string;
};

export const useLocalStorage = <Value>({
  initValue,
  transform = JSON.parse,
  key,
}: UseLocalStorageArgs<Value>): [Value, (value: Value) => void] => {
  const getParsedValueFromStorage = useCallback(() => {
    const savedValue = localStorage.getItem(key);
    if (!savedValue) return initValue;
    return transform(savedValue);
  }, [initValue, key, transform]);

  const [value, setValue] = useState(getParsedValueFromStorage());

  useEffect(() => {
    const parsedValue = getParsedValueFromStorage();
    setValue(parsedValue);
  }, [key, getParsedValueFromStorage]);

  const handleSetValue = useCallback(
    (value: Value) => {
      localStorage.setItem(key, JSON.stringify(value));
      setValue(value);
    },
    [key]
  );

  return [value, handleSetValue];
};
