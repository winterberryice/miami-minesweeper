"use client";

import React from "react";
import { RootContext } from "../Provider";
import { LeafContext } from "./LeafProvider";

function InnerPage() {
  const context = React.useContext(LeafContext);
  const rootContext = React.useContext(RootContext);

  return (
    <div>
      <h1>Hello, I am leaf page</h1>

      <button
        onClick={() => {
          context?.increment();
        }}
      >
        current value: {context?.counter}, click to increment
      </button>

      <div>
        root value: {rootContext?.counter}
        <button
          onClick={() => {
            rootContext?.increment();
          }}
        >
          current value: {rootContext?.counter}, click to increment ROOT
        </button>
      </div>
    </div>
  );
}

export default function Page() {
  return <InnerPage />;
}
