import type { Product } from '@/types';
import ProductCard from './ProductCard';
import { AnimatePresence } from 'framer-motion';

interface ProductGridProps {
    products: Product[];
    columns?: 2 | 3 | 4;
}

export default function ProductGrid({ products, columns = 4 }: ProductGridProps) {
    const colClass = {
        2: 'grid-cols-1 sm:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    };

    return (
        <div className={`grid ${colClass[columns]} gap-4 md:gap-6`}>
            <AnimatePresence mode="popLayout">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </AnimatePresence>
        </div>
    );
}
