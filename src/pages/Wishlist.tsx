import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { HiOutlineHeart, HiOutlineShoppingBag } from 'react-icons/hi';
import { useDocumentTitle } from '@/hooks';
import { useWishlistStore } from '@/store/wishlistStore';
import { api } from '@/services/api';
import ProductGrid from '@/components/product/ProductGrid';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export default function Wishlist() {
    useDocumentTitle('Wishlist');
    const { ids, clear } = useWishlistStore();

    const { data } = useQuery({
        queryKey: ['products', 'wishlist', ids],
        queryFn: async () => {
            const result = await api.getProducts({ limit: 100 });
            return result.data.filter((p) => ids.includes(p.id));
        },
        enabled: ids.length > 0,
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Breadcrumbs />

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Wishlist</h1>
                    <p className="text-sm text-[var(--text-muted)] mt-1">{ids.length} {ids.length === 1 ? 'item' : 'items'}</p>
                </div>
                {ids.length > 0 && (
                    <Button variant="ghost" onClick={clear} className="text-red-500 hover:text-red-600">
                        Clear All
                    </Button>
                )}
            </div>

            {ids.length === 0 ? (
                <EmptyState
                    icon={<HiOutlineHeart className="w-16 h-16" />}
                    title="Your wishlist is empty"
                    description="Save your favorite pieces to find them later"
                    action={
                        <Link to="/shop">
                            <Button icon={<HiOutlineShoppingBag className="w-4 h-4" />}>Browse Products</Button>
                        </Link>
                    }
                />
            ) : data ? (
                <ProductGrid products={data} />
            ) : null}
        </div>
    );
}
