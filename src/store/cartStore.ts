import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/types';

interface CartState {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    getTotal: () => number;
    getCount: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (item) =>
                set((state) => {
                    const existing = state.items.find(
                        (i) =>
                            i.productId === item.productId &&
                            i.selectedSize === item.selectedSize &&
                            i.selectedColor === item.selectedColor
                    );
                    if (existing) {
                        return {
                            items: state.items.map((i) =>
                                i.productId === item.productId &&
                                    i.selectedSize === item.selectedSize &&
                                    i.selectedColor === item.selectedColor
                                    ? { ...i, quantity: i.quantity + item.quantity }
                                    : i
                            ),
                        };
                    }
                    return { items: [...state.items, item] };
                }),

            removeItem: (productId) =>
                set((state) => ({
                    items: state.items.filter((i) => i.productId !== productId),
                })),

            updateQuantity: (productId, quantity) =>
                set((state) => ({
                    items:
                        quantity <= 0
                            ? state.items.filter((i) => i.productId !== productId)
                            : state.items.map((i) =>
                                i.productId === productId ? { ...i, quantity } : i
                            ),
                })),

            clearCart: () => set({ items: [] }),

            getTotal: () =>
                get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

            getCount: () =>
                get().items.reduce((sum, i) => sum + i.quantity, 0),
        }),
        { name: 'fashe-cart' }
    )
);
