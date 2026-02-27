import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    HiOutlineShoppingBag,
    HiOutlineUser,
    HiOutlineSearch,
    HiOutlineMenu,
    HiOutlineSun,
    HiOutlineMoon,
    HiX,
    HiOutlineHeart,
} from 'react-icons/hi';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useScrollLock } from '@/hooks';

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/shop?category=women', label: 'Women' },
    { to: '/shop?category=men', label: 'Men' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    const cartCount = useCartStore((s) => s.getCount());
    const wishlistCount = useWishlistStore((s) => s.ids.length);
    const { openCartDrawer, theme, toggleTheme } = useUIStore();

    useScrollLock(mobileOpen);

    useEffect(() => {
        setMobileOpen(false);
    }, [location]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled
                    ? 'bg-[var(--bg)]/95 glass shadow-sm border-b border-[var(--border)]'
                    : 'bg-transparent'
                }`}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-18">
                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                        aria-label="Open menu"
                    >
                        <HiOutlineMenu className="w-5 h-5" />
                    </button>

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-xl md:text-2xl font-bold tracking-tight">
                            FASHE
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) =>
                                    `relative px-3 py-2 text-sm font-medium transition-colors ${isActive
                                        ? 'text-[var(--text-primary)]'
                                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {link.label}
                                        {isActive && (
                                            <motion.div
                                                layoutId="navbar-indicator"
                                                className="absolute -bottom-px left-3 right-3 h-0.5 bg-primary-600 dark:bg-primary-400 rounded-full"
                                                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                        <Link
                            to="/shop"
                            className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors hidden sm:flex"
                            aria-label="Search"
                        >
                            <HiOutlineSearch className="w-5 h-5" />
                        </Link>

                        <Link
                            to="/wishlist"
                            className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors relative hidden sm:flex"
                            aria-label="Wishlist"
                        >
                            <HiOutlineHeart className="w-5 h-5" />
                            {wishlistCount > 0 && (
                                <motion.span
                                    key={wishlistCount}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                                >
                                    {wishlistCount}
                                </motion.span>
                            )}
                        </Link>

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        >
                            {theme === 'light' ? (
                                <HiOutlineMoon className="w-5 h-5" />
                            ) : (
                                <HiOutlineSun className="w-5 h-5" />
                            )}
                        </button>

                        <Link
                            to="/auth"
                            className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors hidden sm:flex"
                            aria-label="Account"
                        >
                            <HiOutlineUser className="w-5 h-5" />
                        </Link>

                        <button
                            onClick={openCartDrawer}
                            className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors relative"
                            aria-label="Cart"
                        >
                            <HiOutlineShoppingBag className="w-5 h-5" />
                            {cartCount > 0 && (
                                <motion.span
                                    key={cartCount}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                                    className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-primary-950 dark:bg-primary-100 text-white dark:text-primary-950 text-[10px] font-bold rounded-full flex items-center justify-center"
                                >
                                    {cartCount > 9 ? '9+' : cartCount}
                                </motion.span>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                            onClick={() => setMobileOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed top-0 left-0 bottom-0 w-full max-w-xs bg-[var(--bg-card)] z-50 shadow-2xl flex flex-col"
                        >
                            <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
                                <span className="text-xl font-bold tracking-tight">FASHE</span>
                                <button
                                    onClick={() => setMobileOpen(false)}
                                    className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                                    aria-label="Close menu"
                                >
                                    <HiX className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-5">
                                <div className="flex flex-col gap-1">
                                    {navLinks.map((link) => (
                                        <NavLink
                                            key={link.to}
                                            to={link.to}
                                            className={({ isActive }) =>
                                                `px-4 py-3 rounded-lg text-base font-medium transition-colors ${isActive
                                                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300'
                                                    : 'text-[var(--text-secondary)] hover:bg-surface-50 dark:hover:bg-surface-800'
                                                }`
                                            }
                                        >
                                            {link.label}
                                        </NavLink>
                                    ))}
                                </div>

                                <div className="mt-6 pt-6 border-t border-[var(--border)] flex flex-col gap-1">
                                    <Link
                                        to="/wishlist"
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-secondary)] hover:bg-surface-50 dark:hover:bg-surface-800"
                                    >
                                        <HiOutlineHeart className="w-5 h-5" />
                                        Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
                                    </Link>
                                    <Link
                                        to="/auth"
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-secondary)] hover:bg-surface-50 dark:hover:bg-surface-800"
                                    >
                                        <HiOutlineUser className="w-5 h-5" />
                                        Account
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
