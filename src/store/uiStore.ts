import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Toast {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
    undoAction?: () => void;
}

interface UIState {
    isMobileMenuOpen: boolean;
    isCartDrawerOpen: boolean;
    toasts: Toast[];
    theme: 'light' | 'dark';
    toggleMobileMenu: () => void;
    closeMobileMenu: () => void;
    toggleCartDrawer: () => void;
    closeCartDrawer: () => void;
    openCartDrawer: () => void;
    addToast: (toast: Omit<Toast, 'id'>) => void;
    removeToast: (id: string) => void;
    toggleTheme: () => void;
}

export const useUIStore = create<UIState>()(
    persist(
        (set) => ({
            isMobileMenuOpen: false,
            isCartDrawerOpen: false,
            toasts: [],
            theme:
                typeof window !== 'undefined' &&
                    window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? 'dark'
                    : 'light',

            toggleMobileMenu: () =>
                set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),
            closeMobileMenu: () => set({ isMobileMenuOpen: false }),

            toggleCartDrawer: () =>
                set((s) => ({ isCartDrawerOpen: !s.isCartDrawerOpen })),
            closeCartDrawer: () => set({ isCartDrawerOpen: false }),
            openCartDrawer: () => set({ isCartDrawerOpen: true }),

            addToast: (toast) =>
                set((s) => ({
                    toasts: [
                        ...s.toasts,
                        { ...toast, id: Date.now().toString() + Math.random().toString(36) },
                    ],
                })),
            removeToast: (id) =>
                set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

            toggleTheme: () =>
                set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
        }),
        {
            name: 'fashe-ui',
            partialize: (state) => ({ theme: state.theme }),
        }
    )
);
