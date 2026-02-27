import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineHeart, HiHeart, HiOutlineShoppingBag } from 'react-icons/hi';
import type { Product } from '@/types';
import { formatCurrency, getDiscountPercent } from '@/utils';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useUIStore } from '@/store/uiStore';
import RatingStars from './RatingStars';

interface ProductCardProps {
    product: Product;
}

const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
    const addItem = useCartStore((s) => s.addItem);
    const addToast = useUIStore((s) => s.addToast);
    const openCartDrawer = useUIStore((s) => s.openCartDrawer);
    const toggle = useWishlistStore((s) => s.toggle);
    const isWished = useWishlistStore((s) => s.ids.includes(product.id));
    const outOfStock = product.stock <= 0;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (outOfStock) return;
        addItem({
            productId: product.id,
            title: product.title,
            price: product.price,
            image: product.images[0] ?? '',
            quantity: 1,
        });
        addToast({ message: `${product.title} added to cart`, type: 'success' });
        openCartDrawer();
    };

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(product.id);
        addToast({
            message: isWished ? 'Removed from wishlist' : 'Added to wishlist',
            type: 'info',
        });
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
            <Link to={`/product/${product.slug}`} className="group block">
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-surface-100 dark:bg-surface-800 mb-3">
                    <img
                        src={product.images[0]}
                        alt={product.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        {product.originalPrice && (
                            <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                                -{getDiscountPercent(product.price, product.originalPrice)}%
                            </span>
                        )}
                        {product.isNew && (
                            <span className="px-2.5 py-1 bg-primary-950 text-white dark:bg-primary-100 dark:text-primary-950 text-xs font-semibold rounded-full">
                                New
                            </span>
                        )}
                        {outOfStock && (
                            <span className="px-2.5 py-1 bg-surface-500 text-white text-xs font-semibold rounded-full">
                                Sold Out
                            </span>
                        )}
                        {product.stock > 0 && product.stock <= 5 && (
                            <span className="px-2.5 py-1 bg-accent-500 text-white text-xs font-semibold rounded-full">
                                Low Stock
                            </span>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <motion.button
                            whileTap={{ scale: 0.85 }}
                            onClick={handleWishlist}
                            className="p-2 bg-white/90 dark:bg-surface-800/90 rounded-full shadow-md backdrop-blur-sm hover:bg-white dark:hover:bg-surface-700 transition-colors"
                            aria-label={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
                        >
                            {isWished ? (
                                <HiHeart className="w-4.5 h-4.5 text-red-500" />
                            ) : (
                                <HiOutlineHeart className="w-4.5 h-4.5" />
                            )}
                        </motion.button>
                    </div>

                    {/* Add to Cart Button */}
                    {!outOfStock && (
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleAddToCart}
                            className="absolute bottom-3 left-3 right-3 py-2.5 bg-white/95 dark:bg-surface-800/95 backdrop-blur-sm rounded-lg text-sm font-medium shadow-lg flex items-center justify-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                            aria-label={`Add ${product.title} to cart`}
                        >
                            <HiOutlineShoppingBag className="w-4 h-4" />
                            Add to Cart
                        </motion.button>
                    )}
                </div>

                {/* Info */}
                <div className="space-y-1">
                    <RatingStars rating={product.rating} count={product.reviewCount} />
                    <h3 className="text-sm font-medium leading-snug line-clamp-1 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                        {product.title}
                    </h3>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">{formatCurrency(product.price)}</span>
                        {product.originalPrice && (
                            <span className="text-xs text-[var(--text-muted)] line-through">
                                {formatCurrency(product.originalPrice)}
                            </span>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
});

export default ProductCard;
