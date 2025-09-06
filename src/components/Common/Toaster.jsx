// Toaster.jsx
import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react"; // For icons

let showToastFn;

export const showToast = (message, type = "success", duration = 3000) => {
  if (showToastFn) showToastFn({ message, type, duration });
};

const Toaster = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    showToastFn = ({ message, type, duration }) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    };
  }, []);

  const getIcon = (type) => {
    if (type === "success")
      return <CheckCircle className="w-5 h-5 text-green-400" />;
    if (type === "error") return <XCircle className="w-5 h-5 text-red-400" />;
    return null;
  };

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col space-y-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            flex items-center gap-3
            bg-white/80 dark:bg-gray-900/80
            backdrop-blur-md shadow-xl
            rounded-xl px-5 py-3
            border-l-4
            ${
              toast.type === "success"
                ? "border-l-green-400"
                : "border-l-red-400"
            }
            opacity-0 animate-slide-in-fade
          `}
        >
          {getIcon(toast.type)}
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
            {toast.message}
          </p>
        </div>
      ))}
      <style>{`
        @keyframes slide-in-fade {
          0% { transform: translateX(50%) scale(0.95); opacity: 0; }
          100% { transform: translateX(0) scale(1); opacity: 1; }
        }
        .animate-slide-in-fade {
          animation: slide-in-fade 0.4s forwards;
        }
      `}</style>
    </div>
  );
};

export default Toaster;
