// src/components/ui/EmptyState.tsx
import type { ReactNode } from 'react';
import { Button } from './Button';

interface Props {
  icon: ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
  };
}

export const EmptyState = ({ icon, title, description, action }: Props) => {
  return (
    <div className="text-center py-16">
      <div className="mx-auto mb-6 text-gray-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-600 mb-3">{title}</h3>
      <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">{description}</p>
      {action && (
        <Button size="lg" onClick={action.onClick}>
          {action.icon}
          {action.label}
        </Button>
      )}
    </div>
  );
};
