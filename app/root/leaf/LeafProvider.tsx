"use client";

import React from "react";

const LeafContext = React.createContext<
  | {
      counter: number;
      increment: () => void;
    }
  | undefined
>(undefined);

function LeafContextProvider({
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
    <LeafContext.Provider value={{ counter, increment }}>
      {children}
    </LeafContext.Provider>
  );
}

export { LeafContextProvider, LeafContext };
