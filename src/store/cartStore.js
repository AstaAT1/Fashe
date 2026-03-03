import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product, quantity = 1, selectedSize = null, selectedColor = null) => {
                set((state) => {
                    const key = `${product.id}-${selectedSize || ''}-${selectedColor || ''}`
                    const existing = state.items.find((i) => i.key === key)
                    if (existing) {
                        const maxQty = product.stock || 99
                        return {
                            items: state.items.map((i) =>
                                i.key === key
                                    ? { ...i, quantity: Math.min(i.quantity + quantity, maxQty) }
                                    : i
                            ),
                        }
                    }
                    return {
                        items: [
                            ...state.items,
                            {
                                key,
                                productId: product.id,
                                title: product.title,
                                price: product.price,
                                image: product.images[0],
                                quantity: Math.min(quantity, product.stock || 99),
                                maxStock: product.stock || 99,
                                selectedSize,
                                selectedColor,
                                slug: product.slug,
                            },
                        ],
                    }
                })
            },

            removeItem: (key) => {
                set((state) => ({ items: state.items.filter((i) => i.key !== key) }))
            },

            updateQuantity: (key, qty) => {
                if (qty <= 0) {
                    get().removeItem(key)
                    return
                }
                set((state) => ({
                    items: state.items.map((i) =>
                        i.key === key ? { ...i, quantity: Math.min(qty, i.maxStock) } : i
                    ),
                }))
            },

            clearCart: () => set({ items: [] }),

            getTotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
            getCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
        }),
        { name: 'fashe-cart' }
    )
)
