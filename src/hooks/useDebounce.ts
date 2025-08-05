import { useEffect, useState } from "react";

export default function useDebounce(initValue: string, delay: number = 500) {
  const [value, setValue] = useState<string>(initValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(initValue);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [initValue, delay]);

  return value;
}
