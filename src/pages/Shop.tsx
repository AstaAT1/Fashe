import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { HiOutlineSearch, HiAdjustments } from 'react-icons/hi';
import { api } from '@/services/api';
import { queryKeys } from '@/services/queryKeys';
import type { ProductFilters, SortOption } from '@/types';
import { useDebounce, useDocumentTitle, useMediaQuery } from '@/hooks';
import ProductGrid from '@/components/product/ProductGrid';
import FiltersSidebar from '@/components/product/FiltersSidebar';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import EmptyState from '@/components/ui/EmptyState';
import { ProductGridSkeleton } from '@/components/ui/Skeleton';

export default function Shop() {
    useDocumentTitle('Shop');
    const [searchParams, setSearchParams] = useSearchParams();
    const isMobile = useMediaQuery('(max-width: 1023px)');
    const [filtersOpen, setFiltersOpen] = useState(false);

    // Filter state
    const [search, setSearch] = useState(searchParams.get('q') || '');
    const [category, setCategory] = useState(searchParams.get('category') || 'all');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
    const [minRating, setMinRating] = useState(0);
    const [inStock, setInStock] = useState(false);
    const [sort, setSort] = useState<SortOption>((searchParams.get('sort') as SortOption) || 'popular');
    const [page, setPage] = useState(1);

    const debouncedSearch = useDebounce(search, 300);

    const filters: ProductFilters = useMemo(
        () => ({
            search: debouncedSearch || undefined,
            category: category !== 'all' ? category : undefined,
            minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
            maxPrice: priceRange[1] < 200 ? priceRange[1] : undefined,
            minRating: minRating > 0 ? minRating : undefined,
            inStock: inStock || undefined,
            sort,
            page,
            limit: 12,
        }),
        [debouncedSearch, category, priceRange, minRating, inStock, sort, page]
    );

    const { data, isLoading } = useQuery({
        queryKey: queryKeys.products.list(filters),
        queryFn: () => api.getProducts(filters),
        placeholderData: (prev) => prev,
    });

    const handleCategoryChange = (cat: string) => {
        setCategory(cat);
        setPage(1);
        const params = new URLSearchParams(searchParams);
        if (cat === 'all') params.delete('category');
        else params.set('category', cat);
        setSearchParams(params);
    };

    const handleReset = () => {
        setCategory('all');
        setPriceRange([0, 200]);
        setMinRating(0);
        setInStock(false);
        setSort('popular');
        setPage(1);
        setSearch('');
        setSearchParams({});
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Breadcrumbs />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold">
                        {category !== 'all' ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Products'}
                    </h1>
                    {data && (
                        <p className="text-sm text-[var(--text-muted)] mt-1">
                            {data.total} {data.total === 1 ? 'product' : 'products'} found
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="relative flex-1 sm:w-64">
                        <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            placeholder="Search products..."
                            className="w-full pl-9 pr-4 py-2 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
                        />
                    </div>

                    {/* Mobile filter toggle */}
                    {isMobile && (
                        <button
                            onClick={() => setFiltersOpen(true)}
                            className="p-2.5 border border-[var(--border)] rounded-lg hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors"
                            aria-label="Open filters"
                        >
                            <HiAdjustments className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>

            <div className="flex gap-8">
                {/* Sidebar — desktop */}
                {!isMobile && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-64 shrink-0"
                    >
                        <FiltersSidebar
                            selectedCategory={category}
                            onCategoryChange={handleCategoryChange}
                            priceRange={priceRange}
                            onPriceRangeChange={setPriceRange}
                            minRating={minRating}
                            onMinRatingChange={(r) => { setMinRating(r); setPage(1); }}
                            inStock={inStock}
                            onInStockChange={(v) => { setInStock(v); setPage(1); }}
                            sort={sort}
                            onSortChange={(s) => { setSort(s); setPage(1); }}
                            onReset={handleReset}
                        />
                    </motion.div>
                )}

                {/* Mobile Filters */}
                {isMobile && (
                    <FiltersSidebar
                        selectedCategory={category}
                        onCategoryChange={handleCategoryChange}
                        priceRange={priceRange}
                        onPriceRangeChange={setPriceRange}
                        minRating={minRating}
                        onMinRatingChange={(r) => { setMinRating(r); setPage(1); }}
                        inStock={inStock}
                        onInStockChange={(v) => { setInStock(v); setPage(1); }}
                        sort={sort}
                        onSortChange={(s) => { setSort(s); setPage(1); }}
                        onReset={handleReset}
                        isMobile
                        isOpen={filtersOpen}
                        onClose={() => setFiltersOpen(false)}
                    />
                )}

                {/* Product Grid */}
                <div className="flex-1">
                    {isLoading ? (
                        <ProductGridSkeleton count={12} />
                    ) : data && data.data.length > 0 ? (
                        <>
                            <ProductGrid products={data.data} columns={isMobile ? 2 : 3} />

                            {/* Pagination */}
                            {data.totalPages > 1 && (
                                <div className="flex items-center justify-center gap-2 mt-10">
                                    {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((p) => (
                                        <button
                                            key={p}
                                            onClick={() => {
                                                setPage(p);
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }}
                                            className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${p === page
                                                    ? 'bg-primary-950 text-white dark:bg-primary-100 dark:text-primary-950'
                                                    : 'hover:bg-surface-100 dark:hover:bg-surface-800 text-[var(--text-secondary)]'
                                                }`}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <EmptyState
                            icon={<HiOutlineSearch className="w-12 h-12" />}
                            title="No products found"
                            description="Try adjusting your filters or search term"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
