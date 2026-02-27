import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineShoppingBag, HiOutlineHeart, HiHeart, HiMinus, HiPlus, HiOutlineTruck } from 'react-icons/hi';
import { api } from '@/services/api';
import { queryKeys } from '@/services/queryKeys';
import { useDocumentTitle } from '@/hooks';
import { formatCurrency, getDiscountPercent, cn } from '@/utils';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useUIStore } from '@/store/uiStore';
import RatingStars from '@/components/product/RatingStars';
import ProductCard from '@/components/product/ProductCard';
import Button from '@/components/ui/Button';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Skeleton from '@/components/ui/Skeleton';

export default function ProductDetails() {
    const { slug } = useParams<{ slug: string }>();
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [isZoomed, setIsZoomed] = useState(false);

    const addItem = useCartStore((s) => s.addItem);
    const toggle = useWishlistStore((s) => s.toggle);
    const isWished = useWishlistStore((s) => (slug ? s.ids : []).length > 0);
    const { addToast, openCartDrawer } = useUIStore();

    const { data: product, isLoading } = useQuery({
        queryKey: queryKeys.products.detail(slug || ''),
        queryFn: () => api.getProductBySlug(slug || ''),
        enabled: !!slug,
    });

    const wished = product ? useWishlistStore.getState().has(product.id) : false;

    const { data: related } = useQuery({
        queryKey: queryKeys.products.related(product?.id ?? 0),
        queryFn: () => api.getRelatedProducts(product!.id),
        enabled: !!product,
    });

    useDocumentTitle(product?.title || 'Product');

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Skeleton className="h-6 w-48 mb-6" variant="text" />
                <div className="grid md:grid-cols-2 gap-8">
                    <Skeleton className="aspect-square w-full" />
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-3/4" variant="text" />
                        <Skeleton className="h-6 w-1/4" variant="text" />
                        <Skeleton className="h-20 w-full" variant="text" />
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Product not found</h1>
                <Link to="/shop">
                    <Button>Back to Shop</Button>
                </Link>
            </div>
        );
    }

    const sizes = product.variants.filter((v) => v.type === 'size');
    const colors = product.variants.filter((v) => v.type === 'color');
    const outOfStock = product.stock <= 0;

    const handleAddToCart = () => {
        if (outOfStock) return;
        addItem({
            productId: product.id,
            title: product.title,
            price: product.price,
            image: product.images[0] ?? '',
            quantity,
            selectedSize: selectedSize || undefined,
            selectedColor: selectedColor || undefined,
        });
        addToast({ message: `${product.title} added to cart`, type: 'success' });
        openCartDrawer();
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Breadcrumbs
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Shop', href: '/shop' },
                    { label: product.title },
                ]}
            />

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mt-4">
                {/* Gallery */}
                <div className="space-y-4">
                    <motion.div
                        className={cn(
                            'relative aspect-square rounded-2xl overflow-hidden bg-surface-100 dark:bg-surface-800 cursor-zoom-in',
                            isZoomed && 'cursor-zoom-out'
                        )}
                        onClick={() => setIsZoomed(!isZoomed)}
                    >
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={selectedImage}
                                src={product.images[selectedImage]}
                                alt={product.title}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, scale: isZoomed ? 1.5 : 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-full object-cover"
                            />
                        </AnimatePresence>

                        {product.originalPrice && (
                            <span className="absolute top-4 left-4 px-3 py-1.5 bg-red-500 text-white text-xs font-semibold rounded-full">
                                -{getDiscountPercent(product.price, product.originalPrice)}%
                            </span>
                        )}
                    </motion.div>

                    {/* Thumbnails */}
                    {product.images.length > 1 && (
                        <div className="flex gap-3">
                            {product.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(i)}
                                    className={cn(
                                        'w-20 h-20 rounded-lg overflow-hidden border-2 transition-all',
                                        selectedImage === i
                                            ? 'border-primary-600 dark:border-primary-400'
                                            : 'border-transparent hover:border-surface-300'
                                    )}
                                >
                                    <img src={img} alt={`${product.title} ${i + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Info */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {product.isNew && (
                            <span className="inline-block px-2.5 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs font-semibold rounded-full mb-3">
                                New Arrival
                            </span>
                        )}

                        <h1 className="text-2xl sm:text-3xl font-bold mb-2">{product.title}</h1>

                        <div className="flex items-center gap-3 mb-4">
                            <RatingStars rating={product.rating} count={product.reviewCount} size="md" />
                        </div>

                        <div className="flex items-baseline gap-3 mb-6">
                            <span className="text-2xl font-bold">{formatCurrency(product.price)}</span>
                            {product.originalPrice && (
                                <span className="text-lg text-[var(--text-muted)] line-through">
                                    {formatCurrency(product.originalPrice)}
                                </span>
                            )}
                        </div>

                        <p className="text-[var(--text-secondary)] leading-relaxed mb-6">{product.description}</p>

                        {/* Colors */}
                        {colors.length > 0 && (
                            <div className="mb-5">
                                <h3 className="text-sm font-semibold mb-2.5">
                                    Color{selectedColor ? `: ${colors.find((c) => c.value === selectedColor)?.label}` : ''}
                                </h3>
                                <div className="flex gap-2">
                                    {colors.map((color) => (
                                        <button
                                            key={color.value}
                                            onClick={() => setSelectedColor(color.value)}
                                            className={cn(
                                                'w-8 h-8 rounded-full border-2 transition-all',
                                                selectedColor === color.value
                                                    ? 'border-primary-600 dark:border-primary-400 ring-2 ring-primary-600/20'
                                                    : 'border-surface-300 dark:border-surface-600'
                                            )}
                                            style={{ backgroundColor: color.hex }}
                                            title={color.label}
                                            aria-label={color.label}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Sizes */}
                        {sizes.length > 0 && (
                            <div className="mb-5">
                                <h3 className="text-sm font-semibold mb-2.5">Size</h3>
                                <div className="flex flex-wrap gap-2">
                                    {sizes.map((size) => (
                                        <button
                                            key={size.value}
                                            onClick={() => setSelectedSize(size.value)}
                                            className={cn(
                                                'min-w-[44px] px-3 py-2 rounded-lg text-sm font-medium border transition-all',
                                                selectedSize === size.value
                                                    ? 'border-primary-600 bg-primary-50 text-primary-700 dark:border-primary-400 dark:bg-primary-950 dark:text-primary-300'
                                                    : 'border-[var(--border)] hover:border-surface-400 dark:hover:border-surface-500'
                                            )}
                                        >
                                            {size.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity & Add to Cart */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center border border-[var(--border)] rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-3 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                                    aria-label="Decrease quantity"
                                >
                                    <HiMinus className="w-4 h-4" />
                                </button>
                                <span className="px-5 text-sm font-medium min-w-[48px] text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="p-3 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                                    aria-label="Increase quantity"
                                >
                                    <HiPlus className="w-4 h-4" />
                                </button>
                            </div>

                            <Button
                                size="lg"
                                fullWidth
                                onClick={handleAddToCart}
                                disabled={outOfStock}
                                icon={<HiOutlineShoppingBag className="w-5 h-5" />}
                            >
                                {outOfStock ? 'Out of Stock' : 'Add to Cart'}
                            </Button>

                            <motion.button
                                whileTap={{ scale: 0.85 }}
                                onClick={() => {
                                    toggle(product.id);
                                    addToast({ message: wished ? 'Removed from wishlist' : 'Added to wishlist', type: 'info' });
                                }}
                                className="p-3 border border-[var(--border)] rounded-lg hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors shrink-0"
                                aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
                            >
                                {wished ? (
                                    <HiHeart className="w-5 h-5 text-red-500" />
                                ) : (
                                    <HiOutlineHeart className="w-5 h-5" />
                                )}
                            </motion.button>
                        </div>

                        {/* Stock Info */}
                        {!outOfStock && (
                            <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-4">
                                <div className={cn('w-2 h-2 rounded-full', product.stock <= 5 ? 'bg-accent-500' : 'bg-green-500')} />
                                {product.stock <= 5 ? `Only ${product.stock} left` : 'In Stock'}
                            </div>
                        )}

                        {/* Shipping */}
                        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] border-t border-[var(--border)] pt-4">
                            <HiOutlineTruck className="w-4 h-4" />
                            Free shipping on orders over $50
                        </div>

                        {/* SKU */}
                        <p className="text-xs text-[var(--text-muted)] mt-4">SKU: {product.sku}</p>
                    </motion.div>
                </div>
            </div>

            {/* Related Products */}
            {related && related.length > 0 && (
                <section className="mt-20 mb-10">
                    <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {related.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
