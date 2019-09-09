import React from 'react';

function useInterval(callback: () => void, delay: number | null): void {
  const savedCallback = React.useRef<() => void>();

  // Remember the latest function.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // eslint-disable-next-line consistent-return
  function effect(): (() => void) | undefined {
    function tick(): void {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return (): void => {
        clearInterval(id);
      };
    }
  }

  // Set up the interval.
  React.useEffect(effect, [delay]);
}

export default useInterval;
