import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistState {
    ids: number[];
    toggle: (id: number) => void;
    has: (id: number) => boolean;
    clear: () => void;
}

export const useWishlistStore = create<WishlistState>()(
    persist(
        (set, get) => ({
            ids: [],
            toggle: (id) =>
                set((s) => ({
                    ids: s.ids.includes(id)
                        ? s.ids.filter((i) => i !== id)
                        : [...s.ids, id],
                })),
            has: (id) => get().ids.includes(id),
            clear: () => set({ ids: [] }),
        }),
        { name: 'fashe-wishlist' }
    )
);
