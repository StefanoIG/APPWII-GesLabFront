// src/components/ui/Modal.tsx
import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState, useRef } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: Props) => {
  const [clickCount, setClickCount] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  if (!isOpen) return null;

  const handleBackdropClick = () => {
    setClickCount(prev => prev + 1);
    
    if (clickCount === 0) {
      // Primer click - iniciar timeout
      timeoutRef.current = setTimeout(() => {
        setClickCount(0); // Reset después de 500ms
      }, 500);
    } else if (clickCount === 1) {
      // Segundo click dentro de 500ms - cerrar modal
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setClickCount(0);
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center p-4"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};