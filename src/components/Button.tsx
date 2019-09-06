import React from 'react';

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function Button({
  children,
  onClick,
}: ButtonProps): JSX.Element {
  return (
    <button
      className="rounded bg-blue-700 hover:bg-blue-800 py-1 px-2"
      type="button"
      onClick={(e): void => {
        if (onClick) {
          onClick(e);
        }
      }}
    >
      {children}
    </button>
  );
}
