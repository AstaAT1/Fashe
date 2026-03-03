import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus, Trash2, ShoppingBag, X } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import { formatCurrency } from '@/lib/utils'
import { toast } from 'sonner'

export default function CartDrawer() {
    const { cartDrawerOpen, closeCartDrawer } = useUIStore()
    const { items, updateQuantity, removeItem, getTotal } = useCartStore()
    const subtotal = getTotal()

    return (
        <AnimatePresence>
            {cartDrawerOpen && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50" onClick={closeCartDrawer} />
                    <motion.div
                        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[var(--bg-card)] z-50 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
                            <h2 className="text-lg font-bold">Shopping Cart ({items.length})</h2>
                            <button onClick={closeCartDrawer} className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors" aria-label="Close cart">
                                <X size={20} />
                            </button>
                        </div>

                        {items.length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center gap-4 px-5">
                                <ShoppingBag size={48} className="text-[var(--text-muted)]" />
                                <p className="text-[var(--text-secondary)] font-medium">Your cart is empty</p>
                                <Link to="/shop" onClick={closeCartDrawer} className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-light transition-colors">
                                    Continue Shopping
                                </Link>
                            </div>
                        ) : (
                            <>
                                {/* Items */}
                                <div className="flex-1 overflow-y-auto p-5 space-y-0">
                                    <AnimatePresence>
                                        {items.map((item) => (
                                            <motion.div key={item.key} layout exit={{ opacity: 0, x: 50, height: 0 }} transition={{ duration: 0.2 }} className="flex gap-4 py-4 border-b border-[var(--border)]">
                                                <Link to={`/product/${item.slug}`} onClick={closeCartDrawer}>
                                                    <img src={item.image} alt={item.title} className="w-20 h-24 object-cover rounded-xl shrink-0" />
                                                </Link>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-semibold truncate">{item.title}</h4>
                                                    {(item.selectedSize || item.selectedColor) && (
                                                        <p className="text-xs text-[var(--text-muted)] mt-0.5">
                                                            {[item.selectedSize?.toUpperCase(), item.selectedColor].filter(Boolean).join(' / ')}
                                                        </p>
                                                    )}
                                                    <p className="text-sm font-bold mt-1">{formatCurrency(item.price)}</p>
                                                    <div className="flex items-center gap-3 mt-2">
                                                        <div className="flex items-center border border-[var(--border)] rounded-lg">
                                                            <button onClick={() => updateQuantity(item.key, item.quantity - 1)} className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors" aria-label="Decrease">
                                                                <Minus size={12} />
                                                            </button>
                                                            <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                                                            <button onClick={() => updateQuantity(item.key, item.quantity + 1)} className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors" aria-label="Increase">
                                                                <Plus size={12} />
                                                            </button>
                                                        </div>
                                                        <button onClick={() => { removeItem(item.key); toast.info(`${item.title} removed`) }} className="p-1.5 text-[var(--text-muted)] hover:text-red-500 transition-colors" aria-label="Remove">
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>

                                {/* Summary */}
                                <div className="border-t border-[var(--border)] p-5 space-y-4">
                                    {subtotal < 50 && (
                                        <div className="bg-accent/10 rounded-xl px-3 py-2.5">
                                            <p className="text-xs text-accent-dark dark:text-accent-light font-medium">Add {formatCurrency(50 - subtotal)} more for free shipping!</p>
                                            <div className="mt-1.5 h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-accent rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (subtotal / 50) * 100)}%` }} />
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[var(--text-secondary)]">Subtotal</span>
                                        <span className="font-bold text-lg">{formatCurrency(subtotal)}</span>
                                    </div>
                                    <Link to="/cart" onClick={closeCartDrawer} className="block w-full py-3 border border-[var(--border)] rounded-xl text-center text-sm font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                                        View Cart
                                    </Link>
                                    <Link to="/checkout" onClick={closeCartDrawer} className="block w-full py-3 bg-primary text-white rounded-xl text-center text-sm font-semibold hover:bg-primary-light transition-colors">
                                        Checkout — {formatCurrency(subtotal)}
                                    </Link>
                                </div>
                            </>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
