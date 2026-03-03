import { memo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag } from 'lucide-react'
import { formatCurrency, getDiscountPercent } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useUIStore } from '@/store/uiStore'
import { toast } from 'sonner'
import RatingStars from './RatingStars'

const ProductCard = memo(function ProductCard({ product }) {
    const addItem = useCartStore((s) => s.addItem)
    const openCartDrawer = useUIStore((s) => s.openCartDrawer)
    const toggle = useWishlistStore((s) => s.toggle)
    const isWished = useWishlistStore((s) => s.ids.includes(product.id))
    const outOfStock = product.stock <= 0
    const colors = product.variants.filter((v) => v.type === 'color').slice(0, 4)

    const handleAddToCart = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (outOfStock) return
        addItem(product, 1)
        toast.success(`${product.title} added to cart`)
        openCartDrawer()
    }

    const handleWishlist = (e) => {
        e.preventDefault()
        e.stopPropagation()
        toggle(product.id)
        toast(isWished ? 'Removed from wishlist' : 'Added to wishlist')
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
            <Link to={`/product/${product.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800 mb-4">
                    <img src={product.images[0]} alt={product.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        {product.originalPrice && (
                            <span className="px-2.5 py-1 bg-red-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                                -{getDiscountPercent(product.price, product.originalPrice)}%
                            </span>
                        )}
                        {product.isNew && (
                            <span className="px-2.5 py-1 bg-primary text-white text-[10px] font-bold rounded-full uppercase tracking-wider">New</span>
                        )}
                        {outOfStock && (
                            <span className="px-2.5 py-1 bg-neutral-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">Sold Out</span>
                        )}
                        {product.stock > 0 && product.stock <= 5 && (
                            <span className="px-2.5 py-1 bg-warning text-white text-[10px] font-bold rounded-full uppercase tracking-wider">Low Stock</span>
                        )}
                    </div>
                    {/* Wishlist */}
                    <div className="absolute top-3 right-3 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <button onClick={handleWishlist} className="p-2.5 bg-white/90 dark:bg-neutral-800/90 rounded-xl shadow-md backdrop-blur-sm hover:bg-white transition-colors" aria-label="Wishlist">
                            <Heart size={16} className={isWished ? 'fill-red-500 text-red-500' : ''} />
                        </button>
                    </div>
                    {/* Add to cart */}
                    {!outOfStock && (
                        <div className="absolute bottom-3 left-3 right-3 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75">
                            <button onClick={handleAddToCart} className="w-full py-3 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-xl text-sm font-semibold shadow-lg flex items-center justify-center gap-2 hover:bg-white transition-colors">
                                <ShoppingBag size={16} /> Add to Cart
                            </button>
                        </div>
                    )}
                </div>
                <div className="space-y-1.5">
                    <RatingStars rating={product.rating} count={product.reviewCount} />
                    <h3 className="text-sm font-semibold line-clamp-1 group-hover:text-accent transition-colors">{product.title}</h3>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">{formatCurrency(product.price)}</span>
                        {product.originalPrice && <span className="text-xs text-[var(--text-muted)] line-through">{formatCurrency(product.originalPrice)}</span>}
                    </div>
                    {colors.length > 0 && (
                        <div className="flex gap-1.5 pt-0.5">
                            {colors.map((c) => (
                                <span key={c.value} className="w-3.5 h-3.5 rounded-full border border-neutral-300 dark:border-neutral-600" style={{ backgroundColor: c.hex }} title={c.label} />
                            ))}
                        </div>
                    )}
                </div>
            </Link>
        </motion.div>
    )
})

export default ProductCard
