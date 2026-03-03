import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useWishlistStore = create(
    persist(
        (set, get) => ({
            ids: [],
            toggle: (id) => {
                set((state) => ({
                    ids: state.ids.includes(id)
                        ? state.ids.filter((i) => i !== id)
                        : [...state.ids, id],
                }))
            },
            has: (id) => get().ids.includes(id),
            clear: () => set({ ids: [] }),
        }),
        { name: 'fashe-wishlist' }
    )
)
