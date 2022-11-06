"use client";

import React from "react";

const RootContext = React.createContext<
  | {
      counter: number;
      increment: () => void;
    }
  | undefined
>(undefined);

function RootContextProvider({
  children,
  label,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [counter, setCounter] = React.useState(0);

  function increment() {
    setCounter((prev) => prev + 1);
  }

  React.useEffect(() => {
    console.log("mount", label);
    return () => {
      console.log("unmount", label);
    };
  }, [label]);

  return (
    <RootContext.Provider value={{ counter, increment }}>
      {children}
    </RootContext.Provider>
  );
}

export { RootContextProvider, RootContext };
