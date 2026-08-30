// path: crs-frontend/src/components/Toast.tsx
// purpose: component thong bao noi (toast) dung chung cho ca he thong, tu dong bien mat sau 3.5 giay
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast-notification toast-${type}`}>
      <span className="toast-icon">
        {type === 'success' ? '✓' : '⚠'}
      </span>
      <span className="toast-message">{message}</span>
      <button onClick={onClose} className="toast-close-btn" aria-label="Close">
        ✕
      </button>
    </div>
  );
}
