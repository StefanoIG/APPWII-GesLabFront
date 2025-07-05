// src/components/ui/Card.tsx
import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: Props) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {children}
    </div>
  );
};