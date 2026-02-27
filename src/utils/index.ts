export const formatCurrency = (amount: number): string =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);

export const cn = (...classes: (string | boolean | undefined | null)[]): string =>
    classes.filter(Boolean).join(' ');

export const slugify = (text: string): string =>
    text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');

export const truncate = (text: string, maxLength: number): string =>
    text.length > maxLength ? text.slice(0, maxLength) + '…' : text;

export const getDiscountPercent = (price: number, originalPrice: number): number =>
    Math.round(((originalPrice - price) / originalPrice) * 100);
