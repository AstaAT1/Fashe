# FASHE Market

A premium fashion e-commerce web app built with React, TypeScript, and modern tooling.

![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue) ![Vite](https://img.shields.io/badge/Vite-7-purple) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-teal)

## Quick Start

```bash
npm install
npm run dev       # → http://localhost:5173
npm run build     # production build
npm run preview   # preview production build
```

## Tech Stack

| Area | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 7 |
| Styling | TailwindCSS v4 (dark mode) |
| State | Zustand (cart, wishlist, UI) |
| Data Fetching | TanStack Query v5 |
| Routing | React Router v7 (lazy routes) |
| Animations | Framer Motion + GSAP |
| Forms | React Hook Form + Zod |

## Project Structure

```
src/
├── assets/image/          # Product & banner images
├── components/
│   ├── layout/            # Navbar, Footer, Layout
│   ├── ui/                # Button, Input, Modal, Drawer, Toast, Skeleton, etc.
│   └── product/           # ProductCard, ProductGrid, RatingStars, FiltersSidebar
├── features/
│   └── cart/              # CartDrawer
├── pages/                 # Home, Shop, ProductDetails, Cart, Checkout, Auth, etc.
├── services/              # Mock API layer + query keys
├── store/                 # Zustand stores (cart, UI, wishlist)
├── hooks/                 # useDebounce, useMediaQuery, useScrollLock, etc.
├── types/                 # TypeScript interfaces
├── data/                  # 24 products + 5 categories (mock data)
├── utils/                 # formatCurrency, cn, etc.
├── styles/                # TailwindCSS v4 design tokens
├── App.tsx                # Routes with lazy loading
└── main.tsx               # Entry point
```

## Pages

- **Home** — Hero (GSAP word reveal), categories grid, bestsellers, banner CTAs, features bar
- **Shop** — Filters (category, price, rating, stock), search with debounce, sort, pagination
- **Product Details** — Image gallery with zoom, size/color variants, add-to-cart, related products
- **Cart** — Quantity controls, remove with undo, order summary
- **Checkout** — Multi-step form (shipping → payment → review → confirmation)
- **Auth** — Login / Register / Forgot Password (front-end only)
- **Wishlist** — Saved products view
- **About / Contact / 404** — Informational pages

## Key Design Decisions

- **Zustand** over Context/Redux for minimal boilerplate + persistence middleware
- **Mock API with delays** to simulate real loading states (skeletons, TanStack Query caching)
- **Code splitting** via `React.lazy` — each page is its own chunk
- **Dark mode** respects OS preference, persisted in localStorage
- **`prefers-reduced-motion`** disables all animations when enabled
- **Mobile-first** responsive design with Tailwind breakpoints

## Data

All data is mocked locally (no backend). Cart and wishlist persist via localStorage.
24 products across 5 categories: Women, Men, Accessories, Shoes, Sale.
