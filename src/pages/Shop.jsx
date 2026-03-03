import { useState, useMemo, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, Search, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { products, categories } from '@/data/products'
import ProductCard from '@/components/product/ProductCard'

const ITEMS_PER_PAGE = 12
const SORT_OPTIONS = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
]

export default function Shop() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [search, setSearch] = useState(searchParams.get('q') || '')
    const [debouncedSearch, setDebouncedSearch] = useState(search)
    const [category, setCategory] = useState(searchParams.get('category') || '')
    const [sort, setSort] = useState('newest')
    const [priceRange, setPriceRange] = useState([0, 200])
    const [page, setPage] = useState(1)
    const [filtersOpen, setFiltersOpen] = useState(false)

    useEffect(() => { document.title = 'Shop — FASHE' }, [])

    // Debounce search
    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(search), 300)
        return () => clearTimeout(t)
    }, [search])

    // Sync URL
    useEffect(() => {
        const cat = searchParams.get('category')
        if (cat && cat !== category) setCategory(cat)
        const q = searchParams.get('q')
        if (q && q !== search) setSearch(q)
    }, [searchParams])

    const filtered = useMemo(() => {
        let result = [...products]

        // Category
        if (category === 'sale') {
            result = result.filter((p) => p.originalPrice && p.originalPrice > p.price)
        } else if (category) {
            result = result.filter((p) => p.category === category)
        }

        // Search
        if (debouncedSearch) {
            const q = debouncedSearch.toLowerCase()
            result = result.filter((p) =>
                p.title.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                p.tags.some((t) => t.includes(q))
            )
        }

        // Price range
        result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

        // Sort
        switch (sort) {
            case 'price-low': result.sort((a, b) => a.price - b.price); break
            case 'price-high': result.sort((a, b) => b.price - a.price); break
            case 'popular': result.sort((a, b) => b.reviewCount - a.reviewCount); break
            case 'rating': result.sort((a, b) => b.rating - a.rating); break
            default: result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break
        }

        return result
    }, [category, debouncedSearch, priceRange, sort])

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
    const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

    useEffect(() => { setPage(1) }, [category, debouncedSearch, priceRange, sort])
    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [page])

    const clearFilters = useCallback(() => {
        setCategory('')
        setSearch('')
        setPriceRange([0, 200])
        setSort('newest')
        setSearchParams({})
    }, [setSearchParams])

    const activeFilterCount = (category ? 1 : 0) + (debouncedSearch ? 1 : 0) + (priceRange[0] > 0 || priceRange[1] < 200 ? 1 : 0)

    return (
        <div className="container-main page-padding">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] mb-4">
                    {category ? categories.find((c) => c.slug === category)?.name || 'Shop' : 'Shop All'}
                </h1>
                <p className="text-[var(--text-secondary)] text-sm">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</p>
            </div>

            {/* Active filters */}
            {activeFilterCount > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-6">
                    {category && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 text-accent text-xs font-medium rounded-full">
                            {categories.find((c) => c.slug === category)?.name || category}
                            <button onClick={() => { setCategory(''); setSearchParams((p) => { p.delete('category'); return p }) }} aria-label="Remove filter"><X size={12} /></button>
                        </span>
                    )}
                    {debouncedSearch && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 text-accent text-xs font-medium rounded-full">
                            &quot;{debouncedSearch}&quot;
                            <button onClick={() => setSearch('')} aria-label="Clear search"><X size={12} /></button>
                        </span>
                    )}
                    <button onClick={clearFilters} className="text-xs text-[var(--text-muted)] hover:text-[var(--text)] underline underline-offset-2 ml-2">Clear all</button>
                </div>
            )}

            <div className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-12">
                {/* Sidebar */}
                <aside className="hidden lg:block">
                    <div className="sticky top-28 space-y-8">
                        {/* Search */}
                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)] mb-3">Search</h3>
                            <div className="relative">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="w-full pl-10 pr-8 py-2.5 border border-[var(--border)] rounded-xl text-sm bg-[var(--bg-card)] focus:outline-none focus:ring-2 focus:ring-accent/40" />
                                {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text)]"><X size={14} /></button>}
                            </div>
                        </div>
                        {/* Categories */}
                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)] mb-3">Category</h3>
                            <div className="space-y-0.5">
                                <button onClick={() => { setCategory(''); setSearchParams({}) }} className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!category ? 'bg-accent/10 text-accent font-medium' : 'text-[var(--text-secondary)] hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}>
                                    All Products
                                </button>
                                {categories.map((c) => (
                                    <button key={c.slug} onClick={() => setCategory(c.slug)} className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${category === c.slug ? 'bg-accent/10 text-accent font-medium' : 'text-[var(--text-secondary)] hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}>
                                        {c.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* Price */}
                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)] mb-3">Price Range</h3>
                            <div className="flex items-center gap-3 text-sm">
                                <span className="text-[var(--text-muted)]">${priceRange[0]}</span>
                                <input type="range" min="0" max="200" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], +e.target.value])} className="flex-1 accent-[var(--color-accent)]" />
                                <span className="text-[var(--text-muted)]">${priceRange[1]}</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main */}
                <div>
                    {/* Toolbar */}
                    <div className="flex items-center justify-between mb-6">
                        <button onClick={() => setFiltersOpen(true)} className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-[var(--border)] rounded-xl text-sm font-medium relative">
                            <SlidersHorizontal size={16} /> Filters
                            {activeFilterCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">{activeFilterCount}</span>}
                        </button>
                        <select value={sort} onChange={(e) => setSort(e.target.value)} className="ml-auto px-4 py-2.5 border border-[var(--border)] rounded-xl text-sm bg-[var(--bg-card)] focus:outline-none focus:ring-2 focus:ring-accent/40">
                            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                    </div>

                    {/* Grid */}
                    {paginated.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                            <AnimatePresence>
                                {paginated.map((p) => <ProductCard key={p.id} product={p} />)}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-xl font-bold mb-3">No products found</p>
                            <p className="text-[var(--text-muted)] mb-6">Try adjusting your filters or search terms.</p>
                            <button onClick={clearFilters} className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold">Clear Filters</button>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-12">
                            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="p-2.5 border border-[var(--border)] rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors" aria-label="Previous">
                                <ChevronLeft size={18} />
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                <button key={p} onClick={() => setPage(p)} className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${p === page ? 'bg-primary text-white' : 'border border-[var(--border)] hover:bg-neutral-50 dark:hover:bg-neutral-800'}`}>
                                    {p}
                                </button>
                            ))}
                            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-2.5 border border-[var(--border)] rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors" aria-label="Next">
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Filters Sheet */}
            <AnimatePresence>
                {filtersOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50" onClick={() => setFiltersOpen(false)} />
                        <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }} className="fixed bottom-0 left-0 right-0 bg-[var(--bg-card)] z-50 rounded-t-2xl shadow-2xl max-h-[80vh] overflow-y-auto p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold">Filters</h3>
                                <button onClick={() => setFiltersOpen(false)} className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"><X size={20} /></button>
                            </div>
                            {/* Mobile Search */}
                            <div className="mb-6">
                                <div className="relative">
                                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                                    <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="w-full pl-10 pr-4 py-2.5 border border-[var(--border)] rounded-xl text-sm bg-[var(--bg-card)] focus:outline-none focus:ring-2 focus:ring-accent/40" />
                                </div>
                            </div>
                            {/* Mobile Categories */}
                            <div className="mb-6">
                                <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)] mb-3">Category</h4>
                                <div className="flex flex-wrap gap-2">
                                    <button onClick={() => setCategory('')} className={`px-3 py-1.5 rounded-full text-sm ${!category ? 'bg-accent text-white' : 'border border-[var(--border)]'}`}>All</button>
                                    {categories.map((c) => (
                                        <button key={c.slug} onClick={() => setCategory(c.slug)} className={`px-3 py-1.5 rounded-full text-sm ${category === c.slug ? 'bg-accent text-white' : 'border border-[var(--border)]'}`}>{c.name}</button>
                                    ))}
                                </div>
                            </div>
                            {/* Mobile Price */}
                            <div className="mb-6">
                                <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)] mb-3">Max Price: ${priceRange[1]}</h4>
                                <input type="range" min="0" max="200" value={priceRange[1]} onChange={(e) => setPriceRange([0, +e.target.value])} className="w-full accent-[var(--color-accent)]" />
                            </div>
                            <button onClick={() => setFiltersOpen(false)} className="w-full py-3 bg-primary text-white rounded-xl text-sm font-semibold">Apply Filters ({filtered.length} results)</button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
