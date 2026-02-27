// ─── Product ────────────────────────────────────────────
export interface ProductVariant {
    type: 'size' | 'color';
    label: string;
    value: string;
    /** hex color code for color variants */
    hex?: string;
}

export interface Product {
    id: number;
    title: string;
    slug: string;
    description: string;
    price: number;
    originalPrice?: number;
    images: string[];
    category: string;
    rating: number;
    reviewCount: number;
    stock: number;
    sku: string;
    variants: ProductVariant[];
    tags: string[];
    isFeatured: boolean;
    isNew: boolean;
}

// ─── Category ───────────────────────────────────────────
export interface Category {
    id: number;
    name: string;
    slug: string;
    image: string;
    description: string;
    productCount: number;
}

// ─── Cart ───────────────────────────────────────────────
export interface CartItem {
    productId: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
    selectedSize?: string;
    selectedColor?: string;
}

// ─── User ───────────────────────────────────────────────
export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

// ─── Address ────────────────────────────────────────────
export interface Address {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
}

// ─── Order ──────────────────────────────────────────────
export interface Order {
    id: string;
    items: CartItem[];
    total: number;
    shipping: Address;
    status: 'pending' | 'processing' | 'shipped' | 'delivered';
    createdAt: string;
}

// ─── Filters ────────────────────────────────────────────
export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'popular' | 'rating';

export interface ProductFilters {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    inStock?: boolean;
    search?: string;
    sort?: SortOption;
    page?: number;
    limit?: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    totalPages: number;
}
