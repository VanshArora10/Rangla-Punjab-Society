import React, { useEffect } from 'react';
import { CheckCircle, XCircle, X, AlertCircle, Info } from 'lucide-react';

const Toast = ({ message, type = 'info', onClose, duration = 5000 }) => {
    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle className="h-5 w-5 text-green-600" />;
            case 'error':
                return <XCircle className="h-5 w-5 text-red-600" />;
            case 'warning':
                return <AlertCircle className="h-5 w-5 text-yellow-600" />;
            default:
                return <Info className="h-5 w-5 text-blue-600" />;
        }
    };

    const getStyles = () => {
        switch (type) {
            case 'success':
                return 'bg-green-50 border-green-200 text-green-800 shadow-green-100';
            case 'error':
                return 'bg-red-50 border-red-200 text-red-800 shadow-red-100';
            case 'warning':
                return 'bg-yellow-50 border-yellow-200 text-yellow-800 shadow-yellow-100';
            default:
                return 'bg-blue-50 border-blue-200 text-blue-800 shadow-blue-100';
        }
    };

    return (
        <div className={`fixed top-4 right-4 z-50 max-w-sm w-full animate-slide-in`}>
            <div className={`rounded-xl border-2 shadow-lg backdrop-blur-sm ${getStyles()}`}>
                <div className="flex items-start p-4">
                    <div className="flex-shrink-0 mr-3 mt-0.5">
                        {getIcon()}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-5">
                            {message}
                        </p>
                    </div>
                    <div className="flex-shrink-0 ml-3">
                        <button
                            onClick={onClose}
                            className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors duration-200"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Toast;
