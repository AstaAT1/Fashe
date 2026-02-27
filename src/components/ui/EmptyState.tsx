import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
    icon?: ReactNode;
    title: string;
    description?: string;
    action?: ReactNode;
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16 px-4 text-center"
        >
            {icon && (
                <div className="w-16 h-16 mb-4 text-[var(--text-muted)] flex items-center justify-center">
                    {icon}
                </div>
            )}
            <h3 className="text-lg font-semibold mb-1">{title}</h3>
            {description && (
                <p className="text-sm text-[var(--text-secondary)] max-w-sm mb-6">{description}</p>
            )}
            {action}
        </motion.div>
    );
}
