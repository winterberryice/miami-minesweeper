"use client";

import React, { useState } from "react";

const RootContext = React.createContext<
  | {
      counter: number;
      increment: () => void;
    }
  | undefined
>(undefined);

function RootContextProvider({ children }: { children: React.ReactNode }) {
  const [counter, setCounter] = useState(0);

  function increment() {
    setCounter((prev) => prev + 1);
  }

  return (
    <RootContext.Provider value={{ counter, increment }}>
      {children}
    </RootContext.Provider>
  );
}

function InnerPage() {
  const context = React.useContext(RootContext);

  return (
    <div>
      <h1>Hello, I am root page</h1>

      <button
        onClick={() => {
          context?.increment();
        }}
      >
        current value: {context?.counter}, click to increment
      </button>
    </div>
  );
}

//TODO context do layout?
export default function Page() {
  return (
    <RootContextProvider>
      <InnerPage />
    </RootContextProvider>
  );
}
