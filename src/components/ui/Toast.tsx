import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiCheckCircle, HiExclamationCircle, HiInformationCircle } from 'react-icons/hi';
import { useUIStore } from '@/store/uiStore';

const icons = {
    success: <HiCheckCircle className="w-5 h-5 text-green-500" />,
    error: <HiExclamationCircle className="w-5 h-5 text-red-500" />,
    info: <HiInformationCircle className="w-5 h-5 text-blue-500" />,
};

export default function Toast() {
    const { toasts, removeToast } = useUIStore();

    return (
        <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <ToastItem
                        key={toast.id}
                        id={toast.id}
                        message={toast.message}
                        type={toast.type}
                        undoAction={toast.undoAction}
                        onDismiss={() => removeToast(toast.id)}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}

function ToastItem({
    id,
    message,
    type,
    undoAction,
    onDismiss,
}: {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
    undoAction?: () => void;
    onDismiss: () => void;
}) {
    useEffect(() => {
        const timer = setTimeout(onDismiss, 5000);
        return () => clearTimeout(timer);
    }, [id, onDismiss]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="flex items-center gap-3 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-4 py-3 shadow-lg"
            role="alert"
        >
            {icons[type]}
            <p className="text-sm flex-1">{message}</p>
            {undoAction && (
                <button
                    onClick={() => {
                        undoAction();
                        onDismiss();
                    }}
                    className="text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400"
                >
                    Undo
                </button>
            )}
            <button
                onClick={onDismiss}
                className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                aria-label="Dismiss"
            >
                <HiX className="w-4 h-4 text-[var(--text-muted)]" />
            </button>
        </motion.div>
    );
}
