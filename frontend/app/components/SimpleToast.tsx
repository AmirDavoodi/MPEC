import React, { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const backgroundColor = type === 'success' ? '#07bc0c' : '#E74C3C';

  return (
    <div
      style={{
        backgroundColor,
        color: '#FFFFFF',
        padding: '12px 20px',
        borderRadius: '4px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        marginBottom: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '500px',
        fontWeight: 'bold',
      }}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '16px',
          cursor: 'pointer',
          marginLeft: '10px',
        }}
      >
        ×
      </button>
    </div>
  );
};

interface ToastContainerProps {
  position?: 'top-center' | 'bottom-center';
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ position = 'bottom-center' }) => {
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: 'success' | 'error' }>>([]);

  // Add to global window object for access from anywhere
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.showToast = (message: string, type: 'success' | 'error') => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);
        return id;
      };
      
      window.hideToast = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      };
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        delete window.showToast;
        delete window.hideToast;
      }
    };
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const positionStyle = position === 'top-center' 
    ? { top: '20px' } 
    : { bottom: '20px' };

  return (
    <div
      style={{
        position: 'fixed',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        ...positionStyle,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

// Helper functions to show toasts
export const showErrorToast = (message: string) => {
  if (typeof window !== 'undefined' && window.showToast) {
    return window.showToast(message, 'error');
  }
  return null;
};

export const showSuccessToast = (message: string) => {
  if (typeof window !== 'undefined' && window.showToast) {
    return window.showToast(message, 'success');
  }
  return null;
};

// Add types to Window interface
declare global {
  interface Window {
    showToast: (message: string, type: 'success' | 'error') => string;
    hideToast: (id: string) => void;
  }
}