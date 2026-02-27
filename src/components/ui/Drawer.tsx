import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { HiX } from 'react-icons/hi';
import { useScrollLock } from '@/hooks';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    side?: 'left' | 'right';
}

export default function Drawer({ isOpen, onClose, title, children, side = 'right' }: DrawerProps) {
    useScrollLock(isOpen);

    const slideFrom = side === 'right' ? '100%' : '-100%';

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/50"
                        onClick={onClose}
                    />
                    <motion.aside
                        initial={{ x: slideFrom }}
                        animate={{ x: 0 }}
                        exit={{ x: slideFrom }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className={`absolute top-0 ${side}-0 h-full w-full max-w-md bg-[var(--bg-card)] shadow-2xl flex flex-col`}
                        role="dialog"
                        aria-modal="true"
                        aria-label={title}
                    >
                        <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
                            <h2 className="text-lg font-semibold">{title}</h2>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                                aria-label="Close"
                            >
                                <HiX className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-5">
                            {children}
                        </div>
                    </motion.aside>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
