import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, ArrowRight, Minus, Plus, Trash2 } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatCurrency } from '@/lib/utils'
import { toast } from 'sonner'

export default function Cart() {
    useEffect(() => { document.title = 'Cart — FASHE' }, [])
    const { items, updateQuantity, removeItem, getTotal } = useCartStore()
    const subtotal = getTotal()
    const shipping = subtotal >= 50 ? 0 : 5.99
    const total = subtotal + shipping

    if (items.length === 0) {
        return (
            <div className="container-main py-20 text-center">
                <ShoppingBag size={54} className="mx-auto mb-6 text-[var(--text-muted)]" />
                <h1 className="text-2xl font-bold mb-3 font-[family-name:var(--font-display)]">Your cart is empty</h1>
                <p className="text-[var(--text-secondary)] mb-8">Looks like you haven't added anything yet.</p>
                <Link to="/shop" className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-light transition-colors">
                    Continue Shopping <ArrowRight size={16} />
                </Link>
            </div>
        )
    }

    return (
        <div className="container-main page-padding">
            <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-display)] mb-10">Shopping Cart</h1>

            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                <div className="lg:col-span-2">
                    {/* Header */}
                    <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_auto] gap-6 pb-4 border-b border-[var(--border)] text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                        <span>Product</span><span className="text-center">Quantity</span><span className="text-right">Total</span><span className="w-10" />
                    </div>
                    <AnimatePresence>
                        {items.map((item) => (
                            <motion.div key={item.key} layout exit={{ opacity: 0, x: -80, height: 0 }} transition={{ duration: 0.3 }} className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_auto] gap-4 sm:gap-6 items-center py-6 border-b border-[var(--border)]">
                                <div className="flex gap-4">
                                    <Link to={`/product/${item.slug}`}>
                                        <img src={item.image} alt={item.title} className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-xl shrink-0" />
                                    </Link>
                                    <div className="min-w-0">
                                        <Link to={`/product/${item.slug}`} className="font-semibold text-sm sm:text-base hover:text-accent transition-colors truncate block">{item.title}</Link>
                                        {(item.selectedSize || item.selectedColor) && (
                                            <p className="text-xs text-[var(--text-muted)] mt-1">{[item.selectedSize?.toUpperCase(), item.selectedColor].filter(Boolean).join(' / ')}</p>
                                        )}
                                        <p className="text-sm font-semibold mt-1.5">{formatCurrency(item.price)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="flex items-center border border-[var(--border)] rounded-xl">
                                        <button onClick={() => updateQuantity(item.key, item.quantity - 1)} className="p-2.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors" aria-label="Decrease"><Minus size={14} /></button>
                                        <span className="px-4 text-sm font-semibold">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.key, item.quantity + 1)} className="p-2.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors" aria-label="Increase"><Plus size={14} /></button>
                                    </div>
                                </div>
                                <p className="text-right font-bold">{formatCurrency(item.price * item.quantity)}</p>
                                <button onClick={() => { removeItem(item.key); toast.info(`${item.title} removed`) }} className="p-2.5 text-[var(--text-muted)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded-xl transition-all justify-self-end" aria-label="Remove">
                                    <Trash2 size={16} />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Summary */}
                <div>
                    <div className="sticky top-28 bg-neutral-50 dark:bg-neutral-900 rounded-2xl p-7 space-y-5">
                        <h2 className="text-lg font-bold font-[family-name:var(--font-display)]">Order Summary</h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between"><span className="text-[var(--text-secondary)]">Subtotal</span><span className="font-semibold">{formatCurrency(subtotal)}</span></div>
                            <div className="flex justify-between"><span className="text-[var(--text-secondary)]">Shipping</span><span className="font-semibold">{shipping === 0 ? <span className="text-success">Free</span> : formatCurrency(shipping)}</span></div>
                            {shipping > 0 && (
                                <div className="bg-accent/10 rounded-xl px-3 py-2.5">
                                    <p className="text-xs text-accent-dark dark:text-accent-light font-medium">Add {formatCurrency(50 - subtotal)} more for free shipping!</p>
                                    <div className="mt-1.5 h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-accent rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (subtotal / 50) * 100)}%` }} />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="border-t border-[var(--border)] pt-4 flex justify-between">
                            <span className="text-lg font-bold">Total</span>
                            <span className="text-xl font-bold">{formatCurrency(total)}</span>
                        </div>
                        <Link to="/checkout" className="block w-full py-3.5 bg-primary text-white rounded-xl text-center text-sm font-semibold hover:bg-primary-light transition-colors">
                            Proceed to Checkout
                        </Link>
                        <Link to="/shop" className="block text-center text-sm text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors">Continue Shopping</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
