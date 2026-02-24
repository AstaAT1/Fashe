import Nav_bar from "../components/Nav_bar/Nav_bar";
import Footer from "../components/Footer/Footer";
import { images } from "../constants";
import { motion } from "framer-motion";
import { useState } from "react";
import { useCart } from "../components/cartProvider/CartProvider";
import CartModal from "../components/cartProvider/cartmodal";
import PageWrapper from "../components/ui/PageWrapper";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import ScrollReveal from "../components/ui/ScrollReveal";
import { products } from "../data/products";
import { Link } from "react-router-dom";

function Shop() {
    const [hoveredId, setHoveredId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [addedProduct, setAddedProduct] = useState(null);
    const { addToCart } = useCart();

    const handleAddToCart = (e, product) => {
        e.preventDefault(); // Prevent navigating if clicking the button
        e.stopPropagation();
        addToCart(product);
        setAddedProduct(product);
        setShowModal(true);
    };

    return (
        <PageWrapper>
            {showModal && <CartModal product={addedProduct} onClose={() => setShowModal(false)} />}

            <Nav_bar />

            {/* Hero */}
            <section className="relative">
                <img src={images.shopss[0]} alt="Featured collection" className="w-full h-64 md:h-80 lg:h-96 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10 flex flex-col items-center justify-center">
                    <h1 className="heading-display text-white tracking-widest text-4xl md:text-5xl">FEATURED</h1>
                    <p className="text-white/80 mt-2 text-sm tracking-wider uppercase">Collection 2026</p>
                </div>
            </section>

            {/* Content */}
            <Section>
                <Container>
                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
                        {/* Sidebar */}
                        <aside className="w-full lg:w-60 shrink-0 space-y-8">
                            <ScrollReveal>
                                <div>
                                    <h2 className="heading-3 mb-4">Categories</h2>
                                    <ul className="space-y-2.5">
                                        {["All", "Women", "Men"].map((cat) => (
                                            <li key={cat} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] cursor-pointer transition-colors">
                                                {cat}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={0.1}>
                                <div>
                                    <h2 className="heading-3 mb-3">Price</h2>
                                    <div className="space-y-2">
                                        {["$0 – $20", "$20 – $40", "$40 – $60"].map((p) => (
                                            <label key={p} className="flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)] cursor-pointer group">
                                                <input type="checkbox" className="w-4 h-4 rounded border-[var(--color-border)] accent-[var(--color-brand)]" />
                                                <span className="group-hover:text-[var(--color-text-primary)] transition-colors">{p}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={0.2}>
                                <input className="input" placeholder="Search products..." />
                            </ScrollReveal>
                        </aside>

                        {/* Main Content */}
                        <div className="flex-1">
                            {/* Top Bar */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                                <div className="flex gap-3">
                                    <select className="input !w-auto !py-2 !px-3 text-sm">
                                        <option>Alphabetically, A-Z</option>
                                    </select>
                                    <select className="input !w-auto !py-2 !px-3 text-sm">
                                        <option>Show {products.length}</option>
                                    </select>
                                </div>
                                <p className="text-small">Showing 1 to {products.length} of {products.length} items</p>
                            </div>

                            {/* Products Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {products.map((p, i) => (
                                    <ScrollReveal key={p.id} delay={i * 0.04}>
                                        <Link
                                            to={`/Details/${p.id}`}
                                            onMouseEnter={() => setHoveredId(p.id)}
                                            onMouseLeave={() => setHoveredId(null)}
                                            className="block group"
                                        >
                                            <div className="relative bg-[var(--color-surface-subtle)] overflow-hidden rounded-[var(--radius-lg)] aspect-[3/4]">
                                                {p.sale && (
                                                    <span className="absolute top-3 left-3 bg-[var(--color-brand)] text-white text-[11px] font-semibold px-3 py-1 rounded-full z-10">
                                                        Sale
                                                    </span>
                                                )}
                                                <motion.img
                                                    src={p.img}
                                                    alt={p.title}
                                                    className="w-full h-full object-cover"
                                                    animate={{ scale: hoveredId === p.id ? 1.04 : 1 }}
                                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                                    loading="lazy"
                                                />
                                                <button
                                                    onClick={(e) => handleAddToCart(e, p)}
                                                    className="absolute bottom-4 left-1/2 btn btn-primary text-xs w-[80%] max-w-[200px]"
                                                    style={{
                                                        opacity: hoveredId === p.id ? 1 : 0,
                                                        transform: hoveredId === p.id
                                                            ? 'translateX(-50%) translateY(0)'
                                                            : 'translateX(-50%) translateY(12px)',
                                                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                                    }}
                                                >
                                                    ADD TO CART
                                                </button>
                                            </div>
                                            <h3 className="mt-4 text-sm font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">{p.title}</h3>
                                            <div className="mt-1 text-sm">
                                                {p.sale ? (
                                                    <div className="flex gap-2 items-center">
                                                        <span className="line-through text-[var(--color-text-muted)]">{p.oldPrice}</span>
                                                        <span className="text-[var(--color-brand)] font-semibold">{p.price}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-[var(--color-text-secondary)]">{p.price}</span>
                                                )}
                                            </div>
                                        </Link>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            <Footer />
        </PageWrapper>
    );
}

export default Shop;