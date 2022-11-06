import Link from "next/link";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* TODO learn about fonts in next.js */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css?family=Permanent+Marker&display=swap"
          rel="stylesheet"
        />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon" />
        <link rel="icon" href="./favicon.ico" type="image/x-icon" />

        <title>Miami minesweeper</title>
      </head>
      <body>
        <div>
          <Link href={"/"}>Home</Link>
          <Link href={"/root"}>Root</Link>
          <Link href={"/root/leaf"}>Leaf</Link>
        </div>
        {children}
      </body>
    </html>
  );
}
