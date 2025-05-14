import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

// Custom toast container with inline styles
export const CustomToastContainer = () => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        width: 'auto',
        maxWidth: '500px',
      }}
    >
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

// Custom toast functions
export const showErrorToast = (message: string) => {
  toast(
    <div style={{ color: '#FFFFFF', fontWeight: 'bold' }}>{message}</div>,
    {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        backgroundColor: '#E74C3C',
        borderRadius: '4px',
        padding: '12px 20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        fontFamily: 'sans-serif',
      }
    }
  );
};

export const showSuccessToast = (message: string) => {
  toast(
    <div style={{ color: '#FFFFFF', fontWeight: 'bold' }}>{message}</div>,
    {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        backgroundColor: '#07bc0c',
        borderRadius: '4px',
        padding: '12px 20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        fontFamily: 'sans-serif',
      }
    }
  );
};