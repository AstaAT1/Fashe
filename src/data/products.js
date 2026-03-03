import shopi2 from '@/assets/image/shopi2.webp'
import shopItem09 from '@/assets/image/shop-item-09.jpg'
import shopy3 from '@/assets/image/shopy3.webp'
import shopy4 from '@/assets/image/shopy4.webp'
import shopy5 from '@/assets/image/shopy5.webp'
import shopy6 from '@/assets/image/shopy6.webp'
import shopy7 from '@/assets/image/shopy7.webp'
import shopy8 from '@/assets/image/shopy8.webp'
import item02 from '@/assets/image/item-02.jpg'
import item03 from '@/assets/image/item-03.jpg'
import item05 from '@/assets/image/item-05.jpg'
import item07 from '@/assets/image/item-07.jpg'
import gallery03 from '@/assets/image/gallery-03.jpg'
import gallery07 from '@/assets/image/gallery-07.jpg'
import gallery09 from '@/assets/image/gallery-09.jpg'
import gallery13 from '@/assets/image/gallery-13.jpg'
import gallery15 from '@/assets/image/gallery-15.jpg'
import cards1 from '@/assets/image/cards1.webp'
import cards2 from '@/assets/image/cards2.webp'
import cards3 from '@/assets/image/cards3.webp'
import cards5 from '@/assets/image/cards5.webp'
import cards6 from '@/assets/image/cards6.webp'

const SIZES = [
    { type: 'size', label: 'XS', value: 'xs' },
    { type: 'size', label: 'S', value: 's' },
    { type: 'size', label: 'M', value: 'm' },
    { type: 'size', label: 'L', value: 'l' },
    { type: 'size', label: 'XL', value: 'xl' },
]

const COLORS = {
    black: { type: 'color', label: 'Black', value: 'black', hex: '#1a1a1a' },
    white: { type: 'color', label: 'White', value: 'white', hex: '#f5f5f5' },
    navy: { type: 'color', label: 'Navy', value: 'navy', hex: '#1e3a5f' },
    beige: { type: 'color', label: 'Beige', value: 'beige', hex: '#d4b896' },
    rose: { type: 'color', label: 'Rose', value: 'rose', hex: '#c77d8a' },
    olive: { type: 'color', label: 'Olive', value: 'olive', hex: '#6b7c4e' },
    grey: { type: 'color', label: 'Grey', value: 'grey', hex: '#9e9e9e' },
}

export const products = [
    {
        id: 1, title: 'Boxy T-Shirt with Roll Sleeve', slug: 'boxy-tshirt-roll-sleeve',
        description: 'A relaxed-fit boxy tee with stylish rolled sleeves. Made from premium organic cotton for all-day comfort.',
        price: 20, originalPrice: null, images: [shopi2, gallery03, gallery07],
        category: 'women', rating: 4.5, reviewCount: 128, stock: 15, sku: 'TSHIRT-BOXY-001',
        variants: [...SIZES, COLORS.black, COLORS.white, COLORS.rose],
        tags: ['bestseller', 'organic'], isFeatured: true, isNew: false,
    },
    {
        id: 2, title: 'Classic V-Neck T-Shirt', slug: 'classic-vneck-tshirt',
        description: 'Timeless V-neck silhouette in ultra-soft pima cotton. Flattering neckline, transitions effortlessly from day to night.',
        price: 25, originalPrice: 35, images: [shopItem09, gallery09, gallery13],
        category: 'women', rating: 4.2, reviewCount: 95, stock: 8, sku: 'TSHIRT-VNECK-002',
        variants: [...SIZES, COLORS.white, COLORS.navy, COLORS.beige],
        tags: ['sale'], isFeatured: true, isNew: false,
    },
    {
        id: 3, title: 'Cotton Crew Neck Tee', slug: 'cotton-crew-neck-tee',
        description: 'Essential crew neck crafted from heavyweight 220gsm cotton. Double-stitched seams. A wardrobe staple.',
        price: 18, originalPrice: null, images: [shopy3, item02, gallery15],
        category: 'men', rating: 4.7, reviewCount: 210, stock: 22, sku: 'TSHIRT-CREW-003',
        variants: [...SIZES, COLORS.black, COLORS.white, COLORS.grey, COLORS.navy],
        tags: ['bestseller'], isFeatured: true, isNew: false,
    },
    {
        id: 4, title: 'Oversized Basic T-Shirt', slug: 'oversized-basic-tshirt',
        description: 'Relaxed oversized fit with dropped shoulders. Soft cotton-modal blend for effortless streetwear looks.',
        price: 30, originalPrice: null, images: [shopy4, gallery03, item03],
        category: 'men', rating: 4.0, reviewCount: 67, stock: 0, sku: 'TSHIRT-OVER-004',
        variants: [...SIZES, COLORS.black, COLORS.olive, COLORS.beige],
        tags: ['streetwear'], isFeatured: false, isNew: false,
    },
    {
        id: 5, title: 'Premium Graphic Tee', slug: 'premium-graphic-tee',
        description: 'Art-forward graphic print on premium ring-spun cotton. Screen-printed by hand for artisanal quality.',
        price: 35, originalPrice: 50, images: [shopy5, gallery07, gallery09],
        category: 'women', rating: 4.8, reviewCount: 156, stock: 5, sku: 'TSHIRT-GRAPH-005',
        variants: [...SIZES, COLORS.white, COLORS.black],
        tags: ['sale', 'limited'], isFeatured: true, isNew: true,
    },
    {
        id: 6, title: 'Striped Cotton Top', slug: 'striped-cotton-top',
        description: 'Nautical-inspired Breton stripes on a relaxed-fit body. Boat neckline with three-quarter sleeves.',
        price: 28, originalPrice: null, images: [shopy6, gallery13, gallery15],
        category: 'women', rating: 4.3, reviewCount: 89, stock: 12, sku: 'TOP-STRIPE-006',
        variants: [...SIZES, COLORS.navy, COLORS.rose],
        tags: ['casual'], isFeatured: false, isNew: true,
    },
    {
        id: 7, title: 'Linen Blend Button-Down', slug: 'linen-blend-button-down',
        description: 'Lightweight linen-cotton blend shirt for warm weather. Mother-of-pearl buttons and relaxed regular fit.',
        price: 45, originalPrice: null, images: [shopy7, item05, gallery03],
        category: 'men', rating: 4.6, reviewCount: 134, stock: 3, sku: 'SHIRT-LINEN-007',
        variants: [...SIZES, COLORS.white, COLORS.beige, COLORS.olive],
        tags: ['premium', 'summer'], isFeatured: true, isNew: false,
    },
    {
        id: 8, title: 'Essential Denim Jacket', slug: 'essential-denim-jacket',
        description: 'Classic trucker silhouette in washed indigo denim. Brass hardware, chest pockets. Goes with everything.',
        price: 65, originalPrice: 85, images: [shopy8, item07, gallery07],
        category: 'women', rating: 4.9, reviewCount: 201, stock: 10, sku: 'JACKET-DENIM-008',
        variants: [{ type: 'size', label: 'S', value: 's' }, { type: 'size', label: 'M', value: 'm' }, { type: 'size', label: 'L', value: 'l' }, { type: 'size', label: 'XL', value: 'xl' }, COLORS.navy, COLORS.black],
        tags: ['sale', 'bestseller'], isFeatured: true, isNew: false,
    },
    {
        id: 9, title: 'Silk Blend Camisole', slug: 'silk-blend-camisole',
        description: 'Delicate silk-blend camisole with adjustable straps and V-neckline. Perfect for layering or wearing solo.',
        price: 42, originalPrice: null, images: [item02, gallery09, shopi2],
        category: 'women', rating: 4.4, reviewCount: 78, stock: 18, sku: 'CAMI-SILK-009',
        variants: [...SIZES.slice(0, 4), COLORS.rose, COLORS.beige, COLORS.black],
        tags: ['elegant', 'evening'], isFeatured: false, isNew: true,
    },
    {
        id: 10, title: 'Tailored Chino Shorts', slug: 'tailored-chino-shorts',
        description: 'Slim-fit chino shorts with 7-inch inseam. Stretch cotton twill for comfort and mobility.',
        price: 38, originalPrice: null, images: [item03, gallery15, shopy4],
        category: 'men', rating: 4.1, reviewCount: 92, stock: 20, sku: 'SHORT-CHINO-010',
        variants: [...SIZES, COLORS.beige, COLORS.navy, COLORS.olive],
        tags: ['summer', 'casual'], isFeatured: false, isNew: false,
    },
    {
        id: 11, title: 'Cashmere Blend Sweater', slug: 'cashmere-blend-sweater',
        description: 'Luxuriously soft cashmere-wool blend crew neck. Ribbed cuffs and hem. An investment piece.',
        price: 89, originalPrice: 120, images: [item05, gallery13, shopy7],
        category: 'women', rating: 4.9, reviewCount: 186, stock: 6, sku: 'SWEATER-CASH-011',
        variants: [...SIZES, COLORS.beige, COLORS.grey, COLORS.rose],
        tags: ['sale', 'premium', 'winter'], isFeatured: true, isNew: false,
    },
    {
        id: 12, title: 'Canvas Tote Bag', slug: 'canvas-tote-bag',
        description: 'Heavy-duty canvas tote with leather handles and brass rivets. Spacious interior with a zippered pocket.',
        price: 32, originalPrice: null, images: [item07, cards1, gallery03],
        category: 'accessories', rating: 4.3, reviewCount: 145, stock: 25, sku: 'BAG-TOTE-012',
        variants: [COLORS.beige, COLORS.black, COLORS.navy],
        tags: ['everyday'], isFeatured: false, isNew: true,
    },
    {
        id: 13, title: 'Wide-Leg Linen Trousers', slug: 'wide-leg-linen-trousers',
        description: 'Flowing wide-leg trousers in pure French linen. High-waisted with flat front and side pockets.',
        price: 55, originalPrice: null, images: [gallery03, shopy6, item02],
        category: 'women', rating: 4.6, reviewCount: 112, stock: 14, sku: 'TROUSER-LINEN-013',
        variants: [...SIZES, COLORS.white, COLORS.beige, COLORS.olive],
        tags: ['summer', 'elegant'], isFeatured: true, isNew: false,
    },
    {
        id: 14, title: 'Merino Wool Beanie', slug: 'merino-wool-beanie',
        description: 'Ultra-fine merino wool beanie with turn-up cuff. Temperature-regulating and itch-free.',
        price: 22, originalPrice: null, images: [cards2, gallery07, item05],
        category: 'accessories', rating: 4.5, reviewCount: 203, stock: 30, sku: 'HAT-BEANIE-014',
        variants: [COLORS.black, COLORS.grey, COLORS.navy, COLORS.beige],
        tags: ['winter', 'bestseller'], isFeatured: false, isNew: false,
    },
    {
        id: 15, title: 'Leather Chelsea Boots', slug: 'leather-chelsea-boots',
        description: 'Full-grain leather Chelsea boots with elastic side panels. Goodyear-welted sole for lasting wear.',
        price: 128, originalPrice: 165, images: [cards3, gallery09, item07],
        category: 'shoes', rating: 4.8, reviewCount: 167, stock: 7, sku: 'BOOT-CHELSEA-015',
        variants: [{ type: 'size', label: '38', value: '38' }, { type: 'size', label: '39', value: '39' }, { type: 'size', label: '40', value: '40' }, { type: 'size', label: '41', value: '41' }, { type: 'size', label: '42', value: '42' }, { type: 'size', label: '43', value: '43' }, { type: 'size', label: '44', value: '44' }, COLORS.black, COLORS.beige],
        tags: ['sale', 'premium'], isFeatured: true, isNew: false,
    },
    {
        id: 16, title: 'Minimal White Sneakers', slug: 'minimal-white-sneakers',
        description: 'Clean leather sneakers with minimalist silhouette. Cushioned insole and rubber outsole.',
        price: 95, originalPrice: null, images: [cards5, gallery15, gallery13],
        category: 'shoes', rating: 4.7, reviewCount: 234, stock: 11, sku: 'SHOE-SNEAK-016',
        variants: [{ type: 'size', label: '38', value: '38' }, { type: 'size', label: '39', value: '39' }, { type: 'size', label: '40', value: '40' }, { type: 'size', label: '41', value: '41' }, { type: 'size', label: '42', value: '42' }, { type: 'size', label: '43', value: '43' }, COLORS.white],
        tags: ['bestseller', 'minimal'], isFeatured: true, isNew: true,
    },
    {
        id: 17, title: 'Structured Wool Blazer', slug: 'structured-wool-blazer',
        description: 'Tailored single-breasted blazer in Italian wool. Notch lapels, flap pockets, single back vent.',
        price: 145, originalPrice: null, images: [cards6, item03, gallery03],
        category: 'men', rating: 4.5, reviewCount: 88, stock: 4, sku: 'BLAZER-WOOL-017',
        variants: [{ type: 'size', label: 'S', value: 's' }, { type: 'size', label: 'M', value: 'm' }, { type: 'size', label: 'L', value: 'l' }, { type: 'size', label: 'XL', value: 'xl' }, COLORS.navy, COLORS.black, COLORS.grey],
        tags: ['premium', 'formal'], isFeatured: false, isNew: true,
    },
    {
        id: 18, title: 'Leather Crossbody Bag', slug: 'leather-crossbody-bag',
        description: 'Compact crossbody in pebbled Italian leather. Adjustable strap, zip closure, card slots inside.',
        price: 68, originalPrice: 85, images: [cards1, gallery07, item02],
        category: 'accessories', rating: 4.4, reviewCount: 119, stock: 16, sku: 'BAG-CROSS-018',
        variants: [COLORS.black, COLORS.beige, COLORS.rose],
        tags: ['sale', 'leather'], isFeatured: false, isNew: false,
    },
    {
        id: 19, title: 'Ribbed Knit Midi Dress', slug: 'ribbed-knit-midi-dress',
        description: 'Figure-hugging ribbed knit dress with mock neck and midi length. Stretchy cotton-lycra blend.',
        price: 52, originalPrice: null, images: [gallery09, shopi2, item05],
        category: 'women', rating: 4.6, reviewCount: 143, stock: 9, sku: 'DRESS-KNIT-019',
        variants: [...SIZES, COLORS.black, COLORS.beige, COLORS.rose],
        tags: ['elegant', 'versatile'], isFeatured: true, isNew: false,
    },
    {
        id: 20, title: 'Suede Loafers', slug: 'suede-loafers',
        description: 'Classic penny loafers in buttery Italian suede. Leather-lined with Blake-stitched sole.',
        price: 110, originalPrice: null, images: [gallery13, cards3, gallery15],
        category: 'shoes', rating: 4.3, reviewCount: 76, stock: 8, sku: 'SHOE-LOAFER-020',
        variants: [{ type: 'size', label: '39', value: '39' }, { type: 'size', label: '40', value: '40' }, { type: 'size', label: '41', value: '41' }, { type: 'size', label: '42', value: '42' }, { type: 'size', label: '43', value: '43' }, COLORS.beige, COLORS.navy],
        tags: ['premium', 'formal'], isFeatured: false, isNew: false,
    },
    {
        id: 21, title: 'Puffer Vest', slug: 'puffer-vest',
        description: 'Lightweight recycled-fill puffer vest with stand collar. Water-resistant nylon shell.',
        price: 58, originalPrice: null, images: [gallery15, shopy8, item07],
        category: 'men', rating: 4.2, reviewCount: 64, stock: 13, sku: 'VEST-PUFF-021',
        variants: [...SIZES, COLORS.black, COLORS.olive, COLORS.navy],
        tags: ['winter', 'sustainable'], isFeatured: false, isNew: true,
    },
    {
        id: 22, title: 'Silk Scarf', slug: 'silk-scarf',
        description: 'Hand-printed pure silk twill scarf. 90cm x 90cm. Wear as neckerchief, headband, or bag accent.',
        price: 48, originalPrice: null, images: [gallery07, cards5, shopy5],
        category: 'accessories', rating: 4.7, reviewCount: 98, stock: 20, sku: 'SCARF-SILK-022',
        variants: [COLORS.rose, COLORS.navy, COLORS.beige],
        tags: ['luxury', 'gift'], isFeatured: true, isNew: false,
    },
    {
        id: 23, title: 'Running Sneakers', slug: 'running-sneakers',
        description: 'Performance running shoes with responsive foam midsole and breathable mesh upper.',
        price: 85, originalPrice: 110, images: [cards6, gallery03, cards1],
        category: 'shoes', rating: 4.5, reviewCount: 189, stock: 17, sku: 'SHOE-RUN-023',
        variants: [{ type: 'size', label: '38', value: '38' }, { type: 'size', label: '39', value: '39' }, { type: 'size', label: '40', value: '40' }, { type: 'size', label: '41', value: '41' }, { type: 'size', label: '42', value: '42' }, { type: 'size', label: '43', value: '43' }, { type: 'size', label: '44', value: '44' }, COLORS.black, COLORS.white, COLORS.grey],
        tags: ['sale', 'sport'], isFeatured: false, isNew: false,
    },
    {
        id: 24, title: 'Wrap Midi Skirt', slug: 'wrap-midi-skirt',
        description: 'Elegant wrap skirt in flowing crepe fabric. Adjustable tie waist and midi length.',
        price: 42, originalPrice: null, images: [gallery09, shopy6, gallery13],
        category: 'women', rating: 4.4, reviewCount: 71, stock: 11, sku: 'SKIRT-WRAP-024',
        variants: [...SIZES, COLORS.black, COLORS.rose, COLORS.olive],
        tags: ['elegant', 'office'], isFeatured: false, isNew: true,
    },
]

export const categories = [
    { id: 1, name: 'Women', slug: 'women', image: cards1, description: 'Curated essentials for the modern woman' },
    { id: 2, name: 'Men', slug: 'men', image: cards6, description: 'Timeless pieces for the contemporary man' },
    { id: 3, name: 'Accessories', slug: 'accessories', image: gallery09, description: 'The finishing touches that define your look' },
    { id: 4, name: 'Shoes', slug: 'shoes', image: cards3, description: 'Footwear crafted for comfort and style' },
    { id: 5, name: 'Sale', slug: 'sale', image: cards5, description: 'Premium pieces at irresistible prices' },
]

export const getProductBySlug = (slug) => products.find((p) => p.slug === slug)
export const getProductById = (id) => products.find((p) => p.id === id)
export const getFeaturedProducts = () => products.filter((p) => p.isFeatured)
export const getNewProducts = () => products.filter((p) => p.isNew)
export const getProductsByCategory = (cat) => products.filter((p) => p.category === cat)
export const getSaleProducts = () => products.filter((p) => p.originalPrice && p.originalPrice > p.price)
export const getRelatedProducts = (productId, limit = 4) => {
    const product = getProductById(productId)
    if (!product) return []
    return products.filter((p) => p.id !== productId && p.category === product.category).slice(0, limit)
}
