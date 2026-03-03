import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
    useEffect(() => { document.title = '404 — FASHE' }, [])

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                <motion.p initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="text-8xl sm:text-9xl font-bold text-accent mb-6 font-[family-name:var(--font-display)]">404</motion.p>
                <h1 className="text-2xl sm:text-3xl font-bold mb-3 font-[family-name:var(--font-display)]">Page Not Found</h1>
                <p className="text-[var(--text-secondary)] mb-10 max-w-sm mx-auto">The page you're looking for doesn't exist or has been moved.</p>
                <div className="flex gap-3 justify-center">
                    <Link to="/" className="px-8 py-3.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-light transition-colors">Back to Home</Link>
                    <Link to="/shop" className="px-8 py-3.5 border border-[var(--border)] rounded-xl text-sm font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">Browse Shop</Link>
                </div>
            </motion.div>
        </div>
    )
}
