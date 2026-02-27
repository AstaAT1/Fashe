import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDocumentTitle } from '@/hooks';
import Button from '@/components/ui/Button';

export default function NotFound() {
    useDocumentTitle('404 — Page Not Found');

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <motion.p
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="text-8xl sm:text-9xl font-bold text-primary-200 dark:text-primary-900 mb-4"
                >
                    404
                </motion.p>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">Page Not Found</h1>
                <p className="text-[var(--text-secondary)] mb-8 max-w-sm mx-auto">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link to="/">
                    <Button size="lg">Back to Home</Button>
                </Link>
            </motion.div>
        </div>
    );
}
