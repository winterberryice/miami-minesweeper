import React from "react";
import { RootContextProvider } from "./Provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootContextProvider label="root">{children}</RootContextProvider>;
}
