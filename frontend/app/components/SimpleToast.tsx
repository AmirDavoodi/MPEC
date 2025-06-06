export const fa = {
  toast: {
    success: {
      default: 'عملیات موفقیت آمیز بود',
      created: 'آیتم با موفقیت ایجاد شد',
      updated: 'آیتم با موفقیت به روز شد',
      deleted: 'آیتم با موفقیت حذف شد',
    },
    error: {
      default: 'خطایی رخ داده است',
      network: 'خطای شبکه',
      validation: 'خطای اعتبارسنجی',
      unauthorized: 'دسترسی غیرمجاز',
      forbidden: 'دسترسی ممنوع',
    },
  },
};
export const en = {
  toast: {
    success: {
      default: 'Operation successful',
      created: 'Item created successfully',
      updated: 'Item updated successfully',
      deleted: 'Item deleted successfully',
    },
    error: {
      default: 'An error occurred',
      network: 'Network error',
      validation: 'Validation error',
      unauthorized: 'Unauthorized access',
      forbidden: 'Access denied',
    },
  },
};
import { en } from './locales/en';
import { fa } from './locales/fa';

export const translations = {
  en,
  fa,
};

// Type definitions for translations
export type Translations = typeof en;
import React, { createContext, useContext, useState } from 'react';

interface LanguageContextType {
  lang: string;
  setLang: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [lang, setLang] = useState('en');
  
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/i18n';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
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

// Helper functions to show toasts with multilingual support
interface ShowToastProps {
  message?: string;
  defaultMessage: string;
}

export const showSuccessToast = ({ message, defaultMessage }: ShowToastProps) => {
  if (typeof window !== 'undefined' && window.showToast) {
    const { lang } = useLanguage();
    const t = translations[lang];
    const finalMessage = message || t.toast.success[defaultMessage] || defaultMessage;
    
    return window.showToast(finalMessage, 'success');
  }
  return null;
};

export const showErrorToast = ({ message, defaultMessage }: ShowToastProps) => {
  if (typeof window !== 'undefined' && window.showToast) {
    const { lang } = useLanguage();
    const t = translations[lang];
    const finalMessage = message || t.toast.error[defaultMessage] || t.toast.error.default;
    
    return window.showToast(finalMessage, 'error');
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
