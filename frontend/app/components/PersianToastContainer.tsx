import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/i18n';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const PersianToast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const { lang } = useLanguage();
  const t = translations[lang];
  
  // Get translated message or use default
  const finalMessage = message || t.toast[type][message] || message;

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
        direction: 'rtl',
        fontFamily: 'Tahoma, Arial, sans-serif',
      }}
    >
      <span>{finalMessage}</span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '16px',
          cursor: 'pointer',
          marginRight: '10px',
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

export const PersianToastContainer: React.FC<ToastContainerProps> = ({ position = 'bottom-center' }) => {
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: 'success' | 'error' }>>([]);

  // Add to global window object for access from anywhere
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.showPersianToast = (message: string, type: 'success' | 'error') => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);
        return id;
      };
      
      window.hidePersianToast = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      };
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        delete window.showPersianToast;
        delete window.hidePersianToast;
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
        right: '50%',
        transform: 'translateX(50%)',
        zIndex: 9999,
        ...positionStyle,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {toasts.map((toast) => (
        <PersianToast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

// Helper functions to show toasts with multilingual support
interface ShowToastProps {
  message?: string;
  defaultMessage: string;
}

export const showPersianSuccessToast = ({ message, defaultMessage }: ShowToastProps) => {
  if (typeof window !== 'undefined' && window.showPersianToast) {
    const { lang } = useLanguage();
    const t = translations[lang];
    const finalMessage = message || t.toast.success[defaultMessage] || defaultMessage;
    
    return window.showPersianToast(finalMessage, 'success');
  }
  return null;
};

export const showPersianErrorToast = ({ message, defaultMessage }: ShowToastProps) => {
  if (typeof window !== 'undefined' && window.showPersianToast) {
    const { lang } = useLanguage();
    const t = translations[lang];
    const finalMessage = message || t.toast.error[defaultMessage] || t.toast.error.default;
    
    return window.showPersianToast(finalMessage, 'error');
  }
  return null;
};

// Add types to Window interface
declare global {
  interface Window {
    showPersianToast: (message: string, type: 'success' | 'error') => string;
    hidePersianToast: (id: string) => void;
  }
}