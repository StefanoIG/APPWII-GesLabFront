// src/components/layout/PageHeader.tsx
import React from 'react';

interface Props {
  title: string;
  subtitle?: string;
  children?: React.ReactNode; // Para poner botones de acción
}

export const PageHeader = ({ title, subtitle, children }: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          {subtitle && (
            <p className="text-gray-600 text-lg">{subtitle}</p>
          )}
        </div>
        {children && (
          <div className="flex flex-wrap gap-3">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};