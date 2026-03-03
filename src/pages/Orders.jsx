import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Package, ShoppingBag } from 'lucide-react'
import { useOrderStore } from '@/store/orderStore'
import { formatCurrency } from '@/lib/utils'

export default function Orders() {
    useEffect(() => { document.title = 'Orders — FASHE' }, [])
    const orders = useOrderStore((s) => s.orders)

    return (
        <div className="container-main page-padding">
            <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-display)] mb-10">Your Orders</h1>

            {orders.length === 0 ? (
                <div className="text-center py-20">
                    <Package size={54} className="mx-auto mb-6 text-[var(--text-muted)]" />
                    <h2 className="text-xl font-bold mb-3">No orders yet</h2>
                    <p className="text-[var(--text-secondary)] mb-8">Start shopping to see your orders here.</p>
                    <Link to="/shop" className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-light transition-colors">
                        <ShoppingBag size={16} /> Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order, i) => (
                        <motion.div key={order.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                            className="border border-[var(--border)] rounded-2xl overflow-hidden">
                            <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-neutral-50 dark:bg-neutral-900 border-b border-[var(--border)]">
                                <div className="flex gap-6">
                                    <div>
                                        <p className="text-xs text-[var(--text-muted)] mb-0.5">Order ID</p>
                                        <p className="text-sm font-semibold">{order.id}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[var(--text-muted)] mb-0.5">Date</p>
                                        <p className="text-sm font-semibold">{new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[var(--text-muted)] mb-0.5">Total</p>
                                        <p className="text-sm font-bold">{formatCurrency(order.total)}</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs font-semibold rounded-full capitalize">{order.status}</span>
                            </div>
                            <div className="p-5">
                                <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                                    {order.items.map((item) => (
                                        <Link key={item.key} to={`/product/${item.slug}`} className="flex-shrink-0">
                                            <img src={item.image} alt={item.title} className="w-16 h-20 object-cover rounded-xl hover:opacity-80 transition-opacity" title={item.title} />
                                        </Link>
                                    ))}
                                </div>
                                <p className="text-xs text-[var(--text-muted)] mt-3">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    )
}
