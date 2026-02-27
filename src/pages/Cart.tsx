import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineTrash, HiMinus, HiPlus, HiOutlineShoppingBag, HiArrowRight } from 'react-icons/hi';
import { useDocumentTitle } from '@/hooks';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { formatCurrency } from '@/utils';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export default function Cart() {
    useDocumentTitle('Cart');
    const { items, updateQuantity, removeItem, getTotal } = useCartStore();
    const { addToast } = useUIStore();

    const subtotal = getTotal();
    const shipping = subtotal >= 50 ? 0 : 5.99;
    const total = subtotal + shipping;

    const handleRemove = (productId: number, title: string) => {
        const removedItem = items.find((i) => i.productId === productId);
        removeItem(productId);
        addToast({
            message: `${title} removed`,
            type: 'info',
            undoAction: removedItem
                ? () => useCartStore.getState().addItem(removedItem)
                : undefined,
        });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Breadcrumbs />
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            {items.length === 0 ? (
                <EmptyState
                    icon={<HiOutlineShoppingBag className="w-16 h-16" />}
                    title="Your cart is empty"
                    description="Discover our latest collection and fill your bag with something special."
                    action={
                        <Link to="/shop">
                            <Button icon={<HiArrowRight className="w-4 h-4" />}>Continue Shopping</Button>
                        </Link>
                    }
                />
            ) : (
                <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Header */}
                        <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_auto] gap-4 pb-4 border-b border-[var(--border)] text-sm font-medium text-[var(--text-muted)]">
                            <span>Product</span>
                            <span className="text-center">Quantity</span>
                            <span className="text-right">Total</span>
                            <span className="w-8" />
                        </div>

                        {items.map((item) => (
                            <motion.div
                                key={item.productId}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_auto] gap-4 items-center py-4 border-b border-[var(--border)]"
                            >
                                {/* Product */}
                                <div className="flex gap-4">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-xl flex-shrink-0"
                                    />
                                    <div className="min-w-0">
                                        <h3 className="font-medium text-sm sm:text-base truncate">{item.title}</h3>
                                        {(item.selectedSize || item.selectedColor) && (
                                            <p className="text-xs text-[var(--text-muted)] mt-0.5">
                                                {[item.selectedSize?.toUpperCase(), item.selectedColor].filter(Boolean).join(' / ')}
                                            </p>
                                        )}
                                        <p className="text-sm font-semibold mt-1">{formatCurrency(item.price)}</p>
                                    </div>
                                </div>

                                {/* Quantity */}
                                <div className="flex items-center justify-center">
                                    <div className="flex items-center border border-[var(--border)] rounded-lg overflow-hidden">
                                        <button
                                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                            className="p-2 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                                            aria-label="Decrease quantity"
                                        >
                                            <HiMinus className="w-3.5 h-3.5" />
                                        </button>
                                        <span className="px-4 text-sm font-medium">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                            className="p-2 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                                            aria-label="Increase quantity"
                                        >
                                            <HiPlus className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Total */}
                                <p className="text-right font-semibold">
                                    {formatCurrency(item.price * item.quantity)}
                                </p>

                                {/* Remove */}
                                <button
                                    onClick={() => handleRemove(item.productId, item.title)}
                                    className="p-2 text-[var(--text-muted)] hover:text-red-500 transition-colors justify-self-end"
                                    aria-label={`Remove ${item.title}`}
                                >
                                    <HiOutlineTrash className="w-4.5 h-4.5" />
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-surface-50 dark:bg-surface-900 rounded-2xl p-6 space-y-4">
                            <h2 className="text-lg font-semibold">Order Summary</h2>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-[var(--text-secondary)]">Subtotal</span>
                                    <span className="font-medium">{formatCurrency(subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[var(--text-secondary)]">Shipping</span>
                                    <span className="font-medium">
                                        {shipping === 0 ? (
                                            <span className="text-green-600 dark:text-green-400">Free</span>
                                        ) : (
                                            formatCurrency(shipping)
                                        )}
                                    </span>
                                </div>
                                {shipping > 0 && (
                                    <p className="text-xs text-[var(--text-muted)]">
                                        Free shipping on orders over $50 — add{' '}
                                        {formatCurrency(50 - subtotal)} more!
                                    </p>
                                )}
                            </div>

                            <div className="border-t border-[var(--border)] pt-4 flex justify-between">
                                <span className="font-semibold">Total</span>
                                <span className="text-lg font-bold">{formatCurrency(total)}</span>
                            </div>

                            <Link to="/checkout">
                                <Button fullWidth size="lg">
                                    Proceed to Checkout
                                </Button>
                            </Link>

                            <Link
                                to="/shop"
                                className="block text-center text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
