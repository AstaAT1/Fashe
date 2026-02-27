import type { ProductFilters } from '@/types';

export const queryKeys = {
    products: {
        all: ['products'] as const,
        list: (filters: ProductFilters) => ['products', 'list', filters] as const,
        detail: (slug: string) => ['products', 'detail', slug] as const,
        featured: () => ['products', 'featured'] as const,
        related: (id: number) => ['products', 'related', id] as const,
    },
    categories: {
        all: ['categories'] as const,
    },
};
