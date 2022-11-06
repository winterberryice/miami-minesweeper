import React from "react";
import { LeafContextProvider } from "./LeafProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LeafContextProvider label="leaf">{children}</LeafContextProvider>;
}
