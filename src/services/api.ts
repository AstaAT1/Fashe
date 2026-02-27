import type { Product, ProductFilters, PaginatedResponse, Category } from '@/types';
import { products } from '@/data/products';
import { categories } from '@/data/categories';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Compute category product counts dynamically
const getCategoriesWithCounts = (): Category[] =>
    categories.map((cat) => ({
        ...cat,
        productCount:
            cat.slug === 'sale'
                ? products.filter((p) => p.originalPrice != null).length
                : products.filter((p) => p.category === cat.slug).length,
    }));

export const api = {
    async getProducts(filters: ProductFilters = {}): Promise<PaginatedResponse<Product>> {
        await delay(300);

        let filtered = [...products];

        // Search
        if (filters.search) {
            const q = filters.search.toLowerCase();
            filtered = filtered.filter(
                (p) =>
                    p.title.toLowerCase().includes(q) ||
                    p.description.toLowerCase().includes(q) ||
                    p.tags.some((t) => t.toLowerCase().includes(q))
            );
        }

        // Category
        if (filters.category && filters.category !== 'all') {
            if (filters.category === 'sale') {
                filtered = filtered.filter((p) => p.originalPrice != null);
            } else {
                filtered = filtered.filter((p) => p.category === filters.category);
            }
        }

        // Price range
        if (filters.minPrice != null) {
            filtered = filtered.filter((p) => p.price >= filters.minPrice!);
        }
        if (filters.maxPrice != null) {
            filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
        }

        // Rating
        if (filters.minRating != null) {
            filtered = filtered.filter((p) => p.rating >= filters.minRating!);
        }

        // In stock
        if (filters.inStock) {
            filtered = filtered.filter((p) => p.stock > 0);
        }

        // Sort
        switch (filters.sort) {
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'popular':
            default:
                filtered.sort((a, b) => b.reviewCount - a.reviewCount);
                break;
        }

        // Pagination
        const page = filters.page ?? 1;
        const limit = filters.limit ?? 12;
        const startIndex = (page - 1) * limit;
        const paged = filtered.slice(startIndex, startIndex + limit);

        return {
            data: paged,
            total: filtered.length,
            page,
            totalPages: Math.ceil(filtered.length / limit),
        };
    },

    async getProductBySlug(slug: string): Promise<Product | null> {
        await delay(200);
        return products.find((p) => p.slug === slug) ?? null;
    },

    async getCategories(): Promise<Category[]> {
        await delay(150);
        return getCategoriesWithCounts();
    },

    async getFeaturedProducts(): Promise<Product[]> {
        await delay(250);
        return products.filter((p) => p.isFeatured);
    },

    async getRelatedProducts(productId: number, limit = 4): Promise<Product[]> {
        await delay(200);
        const product = products.find((p) => p.id === productId);
        if (!product) return [];
        return products
            .filter((p) => p.id !== productId && p.category === product.category)
            .slice(0, limit);
    },
};
