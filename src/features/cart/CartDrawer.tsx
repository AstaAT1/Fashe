import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineTrash, HiMinus, HiPlus } from 'react-icons/hi';
import Drawer from '@/components/ui/Drawer';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { formatCurrency } from '@/utils';
import { HiOutlineShoppingBag } from 'react-icons/hi';

export default function CartDrawer() {
    const { isCartDrawerOpen, closeCartDrawer, addToast } = useUIStore();
    const { items, updateQuantity, removeItem, getTotal } = useCartStore();

    const handleRemove = (productId: number, title: string) => {
        const removedItem = items.find((i) => i.productId === productId);
        removeItem(productId);
        addToast({
            message: `${title} removed from cart`,
            type: 'info',
            undoAction: removedItem
                ? () => {
                    useCartStore.getState().addItem(removedItem);
                }
                : undefined,
        });
    };

    return (
        <Drawer isOpen={isCartDrawerOpen} onClose={closeCartDrawer} title="Shopping Cart">
            {items.length === 0 ? (
                <EmptyState
                    icon={<HiOutlineShoppingBag className="w-12 h-12" />}
                    title="Your cart is empty"
                    description="Looks like you haven't added anything yet."
                    action={
                        <Link to="/shop" onClick={closeCartDrawer}>
                            <Button>Continue Shopping</Button>
                        </Link>
                    }
                />
            ) : (
                <div className="flex flex-col h-full">
                    <div className="flex-1 space-y-4">
                        {items.map((item) => (
                            <motion.div
                                key={item.productId}
                                layout
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex gap-3"
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-20 h-24 object-cover rounded-lg flex-shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium truncate">{item.title}</h4>
                                    {(item.selectedSize || item.selectedColor) && (
                                        <p className="text-xs text-[var(--text-muted)] mt-0.5">
                                            {[item.selectedSize?.toUpperCase(), item.selectedColor].filter(Boolean).join(' / ')}
                                        </p>
                                    )}
                                    <p className="text-sm font-semibold mt-1">{formatCurrency(item.price)}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="flex items-center border border-[var(--border)] rounded-lg overflow-hidden">
                                            <button
                                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                                className="p-1.5 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                                                aria-label="Decrease quantity"
                                            >
                                                <HiMinus className="w-3 h-3" />
                                            </button>
                                            <span className="px-3 text-sm font-medium">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                className="p-1.5 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                                                aria-label="Increase quantity"
                                            >
                                                <HiPlus className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => handleRemove(item.productId, item.title)}
                                            className="p-1.5 text-[var(--text-muted)] hover:text-red-500 transition-colors"
                                            aria-label={`Remove ${item.title}`}
                                        >
                                            <HiOutlineTrash className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="border-t border-[var(--border)] pt-4 mt-4 space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-[var(--text-secondary)]">Subtotal</span>
                            <span className="font-semibold">{formatCurrency(getTotal())}</span>
                        </div>
                        <p className="text-xs text-[var(--text-muted)]">Shipping & taxes calculated at checkout</p>
                        <Link to="/cart" onClick={closeCartDrawer}>
                            <Button fullWidth variant="outline" className="mb-2">
                                View Cart
                            </Button>
                        </Link>
                        <Link to="/checkout" onClick={closeCartDrawer}>
                            <Button fullWidth>Checkout</Button>
                        </Link>
                    </div>
                </div>
            )}
        </Drawer>
    );
}
