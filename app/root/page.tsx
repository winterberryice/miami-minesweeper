"use client";

import React from "react";
import { RootContext } from "./Provider";

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

export default function Page() {
  return <InnerPage />;
}
