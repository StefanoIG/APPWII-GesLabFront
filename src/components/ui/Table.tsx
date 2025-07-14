// src/components/ui/Table.tsx
import React from 'react';

interface Props {
  headers: string[];
  children: React.ReactNode;
}

export const Table = ({ headers, children }: Props) => {
  return (
    <div className="w-full overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col" className="px-6 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  );
};