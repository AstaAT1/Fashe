import type { SortOption } from '@/types';
import { cn } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiAdjustments } from 'react-icons/hi';
import { categories } from '@/data/categories';
import { useState } from 'react';

interface FiltersProps {
    selectedCategory: string;
    onCategoryChange: (cat: string) => void;
    priceRange: [number, number];
    onPriceRangeChange: (range: [number, number]) => void;
    minRating: number;
    onMinRatingChange: (r: number) => void;
    inStock: boolean;
    onInStockChange: (v: boolean) => void;
    sort: SortOption;
    onSortChange: (s: SortOption) => void;
    onReset: () => void;
    isMobile?: boolean;
    isOpen?: boolean;
    onClose?: () => void;
}

export default function FiltersSidebar({
    selectedCategory,
    onCategoryChange,
    priceRange,
    onPriceRangeChange,
    minRating,
    onMinRatingChange,
    inStock,
    onInStockChange,
    sort,
    onSortChange,
    onReset,
    isMobile,
    isOpen,
    onClose,
}: FiltersProps) {
    const allCategories = [{ slug: 'all', name: 'All' }, ...categories.filter(c => c.slug !== 'sale')];
    const sortOptions: { value: SortOption; label: string }[] = [
        { value: 'popular', label: 'Most Popular' },
        { value: 'newest', label: 'Newest' },
        { value: 'price-asc', label: 'Price: Low → High' },
        { value: 'price-desc', label: 'Price: High → Low' },
        { value: 'rating', label: 'Highest Rated' },
    ];

    const hasActiveFilters =
        selectedCategory !== 'all' ||
        priceRange[0] > 0 ||
        priceRange[1] < 200 ||
        minRating > 0 ||
        inStock;

    const content = (
        <div className="space-y-6">
            {/* Sort */}
            <FilterSection title="Sort By">
                <select
                    value={sort}
                    onChange={(e) => onSortChange(e.target.value as SortOption)}
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
                >
                    {sortOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </FilterSection>

            {/* Category */}
            <FilterSection title="Category">
                <div className="flex flex-wrap gap-2">
                    {allCategories.map((cat) => (
                        <button
                            key={cat.slug}
                            onClick={() => onCategoryChange(cat.slug)}
                            className={cn(
                                'px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200',
                                selectedCategory === cat.slug
                                    ? 'bg-primary-950 text-white dark:bg-primary-100 dark:text-primary-950'
                                    : 'bg-surface-100 text-[var(--text-secondary)] hover:bg-surface-200 dark:bg-surface-800 dark:hover:bg-surface-700'
                            )}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </FilterSection>

            {/* Price Range */}
            <FilterSection title={`Price: $${priceRange[0]} — $${priceRange[1]}`}>
                <div className="space-y-2">
                    <input
                        type="range"
                        min={0}
                        max={200}
                        value={priceRange[0]}
                        onChange={(e) =>
                            onPriceRangeChange([Math.min(+e.target.value, priceRange[1] - 5), priceRange[1]])
                        }
                        className="w-full accent-primary-600"
                    />
                    <input
                        type="range"
                        min={0}
                        max={200}
                        value={priceRange[1]}
                        onChange={(e) =>
                            onPriceRangeChange([priceRange[0], Math.max(+e.target.value, priceRange[0] + 5)])
                        }
                        className="w-full accent-primary-600"
                    />
                </div>
            </FilterSection>

            {/* Rating */}
            <FilterSection title="Minimum Rating">
                <div className="flex gap-2">
                    {[0, 3, 3.5, 4, 4.5].map((r) => (
                        <button
                            key={r}
                            onClick={() => onMinRatingChange(r)}
                            className={cn(
                                'px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all',
                                minRating === r
                                    ? 'bg-accent-500 text-white'
                                    : 'bg-surface-100 dark:bg-surface-800 text-[var(--text-secondary)] hover:bg-surface-200 dark:hover:bg-surface-700'
                            )}
                        >
                            {r === 0 ? 'Any' : `${r}+★`}
                        </button>
                    ))}
                </div>
            </FilterSection>

            {/* Availability */}
            <FilterSection title="Availability">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={inStock}
                        onChange={(e) => onInStockChange(e.target.checked)}
                        className="w-4 h-4 rounded border-surface-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm">In Stock Only</span>
                </label>
            </FilterSection>

            {/* Reset */}
            {hasActiveFilters && (
                <button
                    onClick={onReset}
                    className="w-full py-2 text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                >
                    Clear All Filters
                </button>
            )}
        </div>
    );

    if (isMobile) {
        return (
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-40"
                            onClick={onClose}
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed inset-y-0 left-0 z-50 w-full max-w-sm bg-[var(--bg-card)] shadow-2xl p-6 overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold flex items-center gap-2">
                                    <HiAdjustments className="w-5 h-5" /> Filters
                                </h2>
                                <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-800">
                                    <HiX className="w-5 h-5" />
                                </button>
                            </div>
                            {content}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        );
    }

    return <aside className="w-full">{content}</aside>;
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
    const [open, setOpen] = useState(true);
    return (
        <div>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between w-full text-sm font-semibold mb-3 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
                {title}
                <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    ▾
                </motion.span>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
