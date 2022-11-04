import { useState, useRef, useEffect } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

interface UseMeasure<T> {
  obj: {
    ref: React.RefObject<T>;
  };
  bounds: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
}

export default function useMeasure<T>(): UseMeasure<T> {
  const ref: React.RefObject<T> = useRef(null);
  const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const [ro] = useState(
    () => new ResizeObserver(([entry]): void => set(entry.contentRect)),
  );
  useEffect(() => {
    if (ref.current) ro.observe((ref.current as unknown) as Element);
    return (): void => ro.disconnect();
  }, [ro]);
  return { obj: { ref }, bounds };
}
