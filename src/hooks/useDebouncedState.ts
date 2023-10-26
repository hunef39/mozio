import { useEffect, useState } from "react";

export function useDebouncedState<S>(
  initialState: S | (() => S),
  delay: number
) {
  const [value, setValue] = useState(initialState);
  const [debounced, setDebouncedValue] = useState(initialState);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return {
    value,
    debounced,
    setValue,
  };
}
