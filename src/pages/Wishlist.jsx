import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingBag } from 'lucide-react'
import { useWishlistStore } from '@/store/wishlistStore'
import { getProductById } from '@/data/products'
import ProductCard from '@/components/product/ProductCard'

export default function Wishlist() {
    useEffect(() => { document.title = 'Wishlist — FASHE' }, [])
    const { ids, clear } = useWishlistStore()
    const products = ids.map(getProductById).filter(Boolean)

    return (
        <div className="container-main page-padding">
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-display)]">Wishlist</h1>
                    <p className="text-sm text-[var(--text-muted)] mt-1.5">{ids.length} {ids.length === 1 ? 'item' : 'items'} saved</p>
                </div>
                {ids.length > 0 && (
                    <button onClick={clear} className="text-sm text-red-500 hover:text-red-600 font-medium hover:underline">Clear All</button>
                )}
            </div>
            {products.length === 0 ? (
                <div className="text-center py-20">
                    <Heart size={54} className="mx-auto mb-6 text-[var(--text-muted)]" />
                    <h2 className="text-xl font-bold mb-3">Your wishlist is empty</h2>
                    <p className="text-[var(--text-secondary)] mb-8">Save your favorite pieces to find them later.</p>
                    <Link to="/shop" className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-light transition-colors">
                        <ShoppingBag size={16} /> Browse Products
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {products.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
            )}
        </div>
    )
}
