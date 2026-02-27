import type { Category } from '@/types';

import cards1 from '@/assets/image/cards1.webp';
import cards3 from '@/assets/image/cards3.webp';
import cards5 from '@/assets/image/cards5.webp';
import cards6 from '@/assets/image/cards6.webp';
import gallery09 from '@/assets/image/gallery-09.jpg';

export const categories: Category[] = [
    {
        id: 1,
        name: 'Women',
        slug: 'women',
        image: cards1,
        description: 'Curated essentials for the modern woman',
        productCount: 0, // computed dynamically
    },
    {
        id: 2,
        name: 'Men',
        slug: 'men',
        image: cards6,
        description: 'Timeless pieces for the contemporary man',
        productCount: 0,
    },
    {
        id: 3,
        name: 'Accessories',
        slug: 'accessories',
        image: gallery09,
        description: 'The finishing touches that define your look',
        productCount: 0,
    },
    {
        id: 4,
        name: 'Shoes',
        slug: 'shoes',
        image: cards3,
        description: 'Footwear crafted for comfort and style',
        productCount: 0,
    },
    {
        id: 5,
        name: 'Sale',
        slug: 'sale',
        image: cards5,
        description: 'Premium pieces at irresistible prices',
        productCount: 0,
    },
];
