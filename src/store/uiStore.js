import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useUIStore = create(
    persist(
        (set) => ({
            theme: 'light',
            cartDrawerOpen: false,
            toggleTheme: () =>
                set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
            openCartDrawer: () => set({ cartDrawerOpen: true }),
            closeCartDrawer: () => set({ cartDrawerOpen: false }),
        }),
        { name: 'fashe-ui', partialize: (s) => ({ theme: s.theme }) }
    )
)
