import { useState, useEffect, useCallback } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import { Heart, ShoppingBag, Minus, Plus, ChevronLeft, ChevronRight, Truck, RefreshCw, Shield } from 'lucide-react'
import { getProductBySlug, getRelatedProducts } from '@/data/products'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useUIStore } from '@/store/uiStore'
import { formatCurrency, getDiscountPercent } from '@/lib/utils'
import { toast } from 'sonner'
import ProductCard from '@/components/product/ProductCard'
import RatingStars from '@/components/product/RatingStars'

export default function ProductDetails() {
    const { slug } = useParams()
    const navigate = useNavigate()
    const product = getProductBySlug(slug)

    useEffect(() => {
        if (product) document.title = `${product.title} — FASHE`
        else document.title = 'Product Not Found — FASHE'
    }, [product])

    if (!product) {
        return (
            <div className="container-main py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Product not found</h1>
                <Link to="/shop" className="text-accent hover:underline">Back to Shop</Link>
            </div>
        )
    }

    return (
        <div className="container-main page-padding">
            {/* Breadcrumb */}
            <nav className="text-xs text-[var(--text-muted)] mb-8 flex items-center gap-2">
                <Link to="/" className="hover:text-[var(--text)]">Home</Link>
                <span>/</span>
                <Link to="/shop" className="hover:text-[var(--text)]">Shop</Link>
                <span>/</span>
                <Link to={`/shop?category=${product.category}`} className="hover:text-[var(--text)] capitalize">{product.category}</Link>
                <span>/</span>
                <span className="text-[var(--text)] truncate">{product.title}</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
                <Gallery images={product.images} title={product.title} />
                <ProductInfo product={product} />
            </div>

            {/* Related Products */}
            <RelatedProducts productId={product.id} />
        </div>
    )
}

function Gallery({ images, title }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
    const [selectedIndex, setSelectedIndex] = useState(0)

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
        emblaApi.on('select', onSelect)
        return () => emblaApi.off('select', onSelect)
    }, [emblaApi])

    return (
        <div>
            <div className="relative rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800" ref={emblaRef}>
                <div className="flex">
                    {images.map((src, i) => (
                        <div key={i} className="flex-[0_0_100%] min-w-0">
                            <img src={src} alt={`${title} ${i + 1}`} className="w-full aspect-[3/4] object-cover" />
                        </div>
                    ))}
                </div>
                {images.length > 1 && (
                    <>
                        <button onClick={scrollPrev} className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-white/90 dark:bg-neutral-800/90 rounded-full shadow-md backdrop-blur-sm hover:bg-white transition-colors" aria-label="Previous image"><ChevronLeft size={18} /></button>
                        <button onClick={scrollNext} className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-white/90 dark:bg-neutral-800/90 rounded-full shadow-md backdrop-blur-sm hover:bg-white transition-colors" aria-label="Next image"><ChevronRight size={18} /></button>
                    </>
                )}
            </div>
            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-3 mt-4">
                    {images.map((src, i) => (
                        <button key={i} onClick={() => emblaApi?.scrollTo(i)} className={`w-20 h-24 rounded-xl overflow-hidden border-2 transition-all ${i === selectedIndex ? 'border-accent' : 'border-transparent opacity-60 hover:opacity-100'}`} aria-label={`Thumbnail ${i + 1}`}>
                            <img src={src} alt="" className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

function ProductInfo({ product }) {
    const [selectedSize, setSelectedSize] = useState(null)
    const [selectedColor, setSelectedColor] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [activeTab, setActiveTab] = useState('description')
    const addItem = useCartStore((s) => s.addItem)
    const openCartDrawer = useUIStore((s) => s.openCartDrawer)
    const toggle = useWishlistStore((s) => s.toggle)
    const isWished = useWishlistStore((s) => s.ids.includes(product.id))

    const sizes = product.variants.filter((v) => v.type === 'size')
    const colors = product.variants.filter((v) => v.type === 'color')
    const outOfStock = product.stock <= 0
    const discount = getDiscountPercent(product.price, product.originalPrice)

    const handleAddToCart = () => {
        if (outOfStock) return
        addItem(product, quantity, selectedSize, selectedColor)
        toast.success(`${product.title} added to cart`)
        openCartDrawer()
    }

    return (
        <div className="flex flex-col">
            {/* Category Tag */}
            <Link to={`/shop?category=${product.category}`} className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3 hover:underline">
                {product.category}
            </Link>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-[family-name:var(--font-display)] mb-4">{product.title}</h1>

            <div className="flex items-center gap-3 mb-5">
                <RatingStars rating={product.rating} count={product.reviewCount} size="md" />
            </div>

            <div className="flex items-baseline gap-3 mb-6">
                <span className="text-2xl sm:text-3xl font-bold">{formatCurrency(product.price)}</span>
                {product.originalPrice && (
                    <>
                        <span className="text-lg text-[var(--text-muted)] line-through">{formatCurrency(product.originalPrice)}</span>
                        <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-full">Save {discount}%</span>
                    </>
                )}
            </div>

            {/* Stock */}
            {outOfStock ? (
                <p className="text-red-500 font-semibold text-sm mb-4">Out of Stock</p>
            ) : product.stock <= 5 ? (
                <p className="text-warning font-semibold text-sm mb-4 flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-warning rounded-full animate-pulse" /> Only {product.stock} left
                </p>
            ) : null}

            {/* Colors */}
            {colors.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)] mb-3">
                        Color {selectedColor && <span className="ml-2 normal-case tracking-normal text-[var(--text)]">— {colors.find((c) => c.value === selectedColor)?.label}</span>}
                    </h3>
                    <div className="flex gap-2.5">
                        {colors.map((c) => (
                            <button key={c.value} onClick={() => setSelectedColor(c.value === selectedColor ? null : c.value)}
                                className={`w-9 h-9 rounded-full border-2 transition-all ${selectedColor === c.value ? 'border-accent scale-110 shadow-md' : 'border-neutral-300 dark:border-neutral-600 hover:scale-105'}`}
                                style={{ backgroundColor: c.hex }} aria-label={c.label} title={c.label}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Sizes */}
            {sizes.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)] mb-3">Size</h3>
                    <div className="flex flex-wrap gap-2">
                        {sizes.map((s) => (
                            <button key={s.value} onClick={() => setSelectedSize(s.value === selectedSize ? null : s.value)}
                                className={`min-w-[48px] h-11 px-4 rounded-xl border text-sm font-semibold transition-all ${selectedSize === s.value ? 'bg-primary text-white border-primary' : 'border-[var(--border)] hover:border-neutral-400 dark:hover:border-neutral-500'}`}>
                                {s.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Quantity + Add */}
            <div className="flex gap-3 mb-6">
                <div className="flex items-center border border-[var(--border)] rounded-xl">
                    <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="p-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors rounded-l-xl" aria-label="Decrease"><Minus size={16} /></button>
                    <span className="px-5 text-sm font-semibold">{quantity}</span>
                    <button onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))} className="p-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors rounded-r-xl" aria-label="Increase"><Plus size={16} /></button>
                </div>
                <button onClick={handleAddToCart} disabled={outOfStock}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-light disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                    <ShoppingBag size={18} /> {outOfStock ? 'Sold Out' : 'Add to Cart'}
                </button>
                <button onClick={() => { toggle(product.id); toast(isWished ? 'Removed from wishlist' : 'Added to wishlist') }}
                    className={`p-3 rounded-xl border transition-all ${isWished ? 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-500' : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-red-300 hover:text-red-500'}`}
                    aria-label="Wishlist">
                    <Heart size={18} className={isWished ? 'fill-current' : ''} />
                </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-3 mb-8 py-6 border-t border-b border-[var(--border)]">
                {[
                    { icon: Truck, label: 'Free shipping' },
                    { icon: RefreshCw, label: 'Easy returns' },
                    { icon: Shield, label: 'Secure checkout' },
                ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                        <Icon size={18} className="text-[var(--text-muted)]" />
                        <span className="text-[10px] sm:text-xs text-[var(--text-muted)]">{label}</span>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div>
                <div className="flex border-b border-[var(--border)]">
                    {['description', 'shipping', 'reviews'].map((t) => (
                        <button key={t} onClick={() => setActiveTab(t)} className={`relative px-4 sm:px-6 py-3 text-sm font-medium capitalize transition-colors ${activeTab === t ? 'text-[var(--text)]' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}>
                            {t}
                            {activeTab === t && <motion.div layoutId="product-tab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
                        </button>
                    ))}
                </div>
                <AnimatePresence mode="wait">
                    <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="py-6 text-sm text-[var(--text-secondary)] leading-relaxed">
                        {activeTab === 'description' && <p>{product.description}</p>}
                        {activeTab === 'shipping' && (
                            <div className="space-y-3">
                                <p>• Free standard shipping on orders over $50</p>
                                <p>• Standard delivery: 3-5 business days</p>
                                <p>• Express delivery: 1-2 business days ($9.99)</p>
                                <p>• Same day delivery available in select cities</p>
                            </div>
                        )}
                        {activeTab === 'reviews' && (
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <RatingStars rating={product.rating} />
                                    <span className="font-semibold">{product.rating} out of 5</span>
                                    <span className="text-[var(--text-muted)]">({product.reviewCount} reviews)</span>
                                </div>
                                <p className="text-[var(--text-muted)]">Reviews are not yet available for this product.</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}

function RelatedProducts({ productId }) {
    const related = getRelatedProducts(productId, 4)
    if (related.length === 0) return null

    return (
        <section className="section-padding">
            <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-display)] mb-10">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
        </section>
    )
}
