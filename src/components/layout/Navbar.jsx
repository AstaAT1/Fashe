import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Heart, User, Search, Menu, X, Sun, Moon } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useUIStore } from '@/store/uiStore'

const links = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/shop?category=women', label: 'Women' },
    { to: '/shop?category=men', label: 'Men' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const location = useLocation()
    const cartCount = useCartStore((s) => s.getCount())
    const wishCount = useWishlistStore((s) => s.ids.length)
    const { openCartDrawer, theme, toggleTheme } = useUIStore()

    useEffect(() => { setMobileOpen(false) }, [location])
    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 30)
        window.addEventListener('scroll', fn, { passive: true })
        return () => window.removeEventListener('scroll', fn)
    }, [])

    // Lock scroll
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [mobileOpen])

    return (
        <>
            {/* Announcement */}
            <div className="bg-primary text-white text-center py-2.5 px-4 text-xs tracking-widest uppercase font-medium">
                Free shipping on orders over $50 — Use code <span className="text-accent font-bold">FASHE10</span>
            </div>

            <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[var(--bg)]/95 glass shadow-sm border-b border-[var(--border)]' : 'bg-[var(--bg)] border-b border-transparent'}`}>
                <nav className="container-main">
                    <div className="flex items-center justify-between h-16 lg:h-[72px]">
                        {/* Mobile toggle */}
                        <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors" aria-label="Menu">
                            <Menu size={20} />
                        </button>

                        {/* Logo */}
                        <Link to="/" className="text-xl md:text-2xl font-bold tracking-[0.15em] font-[family-name:var(--font-display)] hover:text-accent transition-colors">
                            FASHE
                        </Link>

                        {/* Desktop nav */}
                        <div className="hidden lg:flex items-center gap-1">
                            {links.map((l) => (
                                <NavLink
                                    key={l.to}
                                    to={l.to}
                                    end={l.to === '/'}
                                    className={({ isActive }) =>
                                        `relative px-4 py-2 text-[13px] font-medium tracking-wide uppercase transition-colors ${isActive ? 'text-[var(--text)]' : 'text-[var(--text-secondary)] hover:text-[var(--text)]'}`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            {l.label}
                                            {isActive && (
                                                <motion.div layoutId="nav-indicator" className="absolute -bottom-[1px] left-4 right-4 h-[2px] bg-accent rounded-full" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                                            )}
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-0.5">
                            <button onClick={toggleTheme} className="p-2.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all" aria-label="Toggle theme">
                                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                            </button>
                            <Link to="/shop" className="p-2.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all hidden sm:block" aria-label="Search">
                                <Search size={18} />
                            </Link>
                            <Link to="/wishlist" className="p-2.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all relative hidden sm:block" aria-label="Wishlist">
                                <Heart size={18} />
                                {wishCount > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{wishCount}</span>}
                            </Link>
                            <Link to="/orders" className="p-2.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all hidden sm:block" aria-label="Account">
                                <User size={18} />
                            </Link>
                            <button onClick={openCartDrawer} className="p-2.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all relative" aria-label="Cart">
                                <ShoppingBag size={18} />
                                {cartCount > 0 && (
                                    <motion.span key={cartCount} initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                                        {cartCount > 9 ? '9+' : cartCount}
                                    </motion.span>
                                )}
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-50 lg:hidden" onClick={() => setMobileOpen(false)} />
                        <motion.div
                            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed top-0 left-0 bottom-0 w-full max-w-[320px] bg-[var(--bg-card)] z-50 shadow-2xl flex flex-col"
                        >
                            <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
                                <span className="text-lg font-bold tracking-[0.15em]">FASHE</span>
                                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800" aria-label="Close">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-5 space-y-1">
                                {links.map((l, i) => (
                                    <motion.div key={l.to} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                                        <NavLink
                                            to={l.to}
                                            className={({ isActive }) =>
                                                `block px-4 py-3 rounded-lg text-[15px] font-medium transition-all ${isActive ? 'bg-accent/10 text-accent' : 'text-[var(--text-secondary)] hover:bg-neutral-100 dark:hover:bg-neutral-800'}`
                                            }
                                        >{l.label}</NavLink>
                                    </motion.div>
                                ))}
                                <div className="pt-6 mt-6 border-t border-[var(--border)] space-y-1">
                                    <Link to="/wishlist" className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-secondary)] hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                        <Heart size={18} /> Wishlist {wishCount > 0 && <span className="ml-auto text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-full">{wishCount}</span>}
                                    </Link>
                                    <Link to="/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-secondary)] hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                        <User size={18} /> Orders
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
