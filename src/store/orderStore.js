import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useOrderStore = create(
    persist(
        (set, get) => ({
            orders: [],
            placeOrder: (items, shippingInfo, total) => {
                const order = {
                    id: `ORD-${Date.now().toString(36).toUpperCase()}`,
                    items: [...items],
                    shippingInfo,
                    total,
                    status: 'confirmed',
                    date: new Date().toISOString(),
                }
                set((state) => ({ orders: [order, ...state.orders] }))
                return order
            },
            getOrders: () => get().orders,
        }),
        { name: 'fashe-orders' }
    )
)
