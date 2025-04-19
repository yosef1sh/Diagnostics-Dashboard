import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg p-6 min-w-[500px] relative" onClick={e => e.stopPropagation()} style={{ zIndex: 10 }}>
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        {children}
      </div>
      <div className="fixed inset-0" onClick={onClose} style={{ zIndex: 0 }} />
    </div>
  );
};

export default Modal;
