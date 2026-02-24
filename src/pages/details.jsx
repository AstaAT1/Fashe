import { useParams, Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Nav_bar from "../components/Nav_bar/Nav_bar";
import { getProductById, getFeaturedProducts } from "../data/products";
import PageWrapper from "../components/ui/PageWrapper";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import ScrollReveal from "../components/ui/ScrollReveal";
import { useCart } from "../components/cartProvider/CartProvider";
import CartModal from "../components/cartProvider/cartmodal";
import { useState } from "react";

function Details() {
    const { id } = useParams();
    const product = getProductById(id);
    const featured = getFeaturedProducts().filter(p => p.id !== Number(id)).slice(0, 4);

    const [quantity, setQuantity] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const { addToCart } = useCart();

    if (!product) {
        return (
            <PageWrapper>
                <Nav_bar />
                <Section>
                    <Container>
                        <div className="text-center py-20">
                            <h1 className="heading-1 mb-4">Product Not Found</h1>
                            <p className="text-body mx-auto mb-6">The product you're looking for doesn't exist.</p>
                            <Link to="/Shop" className="btn btn-primary">Back to Shop</Link>
                        </div>
                    </Container>
                </Section>
                <Footer />
            </PageWrapper>
        );
    }

    const handleAddToCart = () => {
        // Add multiple quantity by calling loop, or optimally modifying addToCart to accept quantity.
        // For now, CartContext addToCart just adds 1, so we loop or we pass object. 
        // Wait, the standard let's just add the product once for now or update it.
        // In CartProvider, addToCart does: `return [...prevCart, { ...product, quantity: 1 }]`
        // We'll just call it `quantity` times.
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        setShowModal(true);
    };

    return (
        <PageWrapper>
            {showModal && <CartModal product={product} onClose={() => setShowModal(false)} />}
            <Nav_bar />

            <Section className="!pt-8 md:!pt-12">
                <Container>
                    {/* Breadcrumb */}
                    <ScrollReveal>
                        <nav className="mb-8 text-sm text-[var(--color-text-muted)]">
                            <Link to="/" className="hover:text-[var(--color-text-primary)] transition-colors">Home</Link>
                            <span className="mx-2">›</span>
                            <Link to="/Shop" className="hover:text-[var(--color-text-primary)] transition-colors">Shop</Link>
                            <span className="mx-2">›</span>
                            <span className="text-[var(--color-text-primary)]">{product.title}</span>
                        </nav>
                    </ScrollReveal>

                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">

                        {/* Image Gallery Area */}
                        <div className="w-full lg:w-1/2 shrink-0">
                            <ScrollReveal>
                                <div className="bg-[var(--color-surface-subtle)] rounded-[var(--radius-xl)] overflow-hidden">
                                    <img
                                        src={product.img}
                                        alt={product.title}
                                        className="w-full h-auto object-cover aspect-[3/4]"
                                    />
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 py-4">
                            <ScrollReveal delay={0.05}>
                                <h1 className="text-2xl md:text-3xl font-normal text-gray-900 mb-4">{product.title}</h1>

                                <div className="flex items-center gap-4 mb-6 text-xl">
                                    {product.oldPrice ? (
                                        <>
                                            <span className="text-[var(--color-text-muted)] line-through">{product.oldPrice}</span>
                                            <span className="text-[var(--color-brand)] font-medium">{product.price}</span>
                                        </>
                                    ) : (
                                        <span className="font-medium text-gray-900">{product.price}</span>
                                    )}
                                </div>

                                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                                    Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.
                                </p>
                            </ScrollReveal>

                            <ScrollReveal delay={0.1}>
                                <div className="space-y-6 mb-10">
                                    {/* Size */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                                        <select className="input w-full max-w-xs">
                                            <option>Choose an option</option>
                                            <option>Size S</option>
                                            <option>Size M</option>
                                            <option>Size L</option>
                                            <option>Size XL</option>
                                        </select>
                                    </div>

                                    {/* Color */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                                        <select className="input w-full max-w-xs">
                                            <option>Choose an option</option>
                                            <option>Gray</option>
                                            <option>Dark Blue</option>
                                        </select>
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* Add to Cart Actions */}
                            <ScrollReveal delay={0.15}>
                                <div className="flex flex-wrap items-center gap-4 py-8 border-y border-gray-200">
                                    <div className="flex items-center border border-gray-300 rounded-[var(--radius-md)]">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                                        >
                                            -
                                        </button>
                                        <div className="w-12 h-10 flex items-center justify-center text-sm font-medium border-x border-gray-300 bg-gray-50">
                                            {quantity}
                                        </div>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        onClick={handleAddToCart}
                                        className="btn btn-primary px-8"
                                    >
                                        ADD TO CART
                                    </button>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={0.2}>
                                <div className="mt-8 space-y-2 text-sm text-gray-500">
                                    <p><span className="text-gray-900 font-medium">SKU:</span> {product.sku}</p>
                                    <p><span className="text-gray-900 font-medium">Categories:</span> {product.category}</p>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>

                    {/* Featured / Related Products */}
                    <div className="mt-24">
                        <ScrollReveal>
                            <h3 className="text-xl font-medium text-center mb-10 uppercase tracking-widest">Related Products</h3>
                        </ScrollReveal>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featured.map((p, i) => (
                                <ScrollReveal key={p.id} delay={i * 0.05}>
                                    <Link to={`/Details/${p.id}`} className="block group">
                                        <div className="relative bg-[var(--color-surface-subtle)] overflow-hidden rounded-[var(--radius-lg)] aspect-[3/4] mb-4">
                                            <img
                                                src={p.img}
                                                alt={p.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <h4 className="text-sm font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">{p.title}</h4>
                                        <p className="mt-1 text-sm font-medium text-gray-900">{p.price}</p>
                                    </Link>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </Container>
            </Section>

            <Footer />
        </PageWrapper>
    );
}

export default Details;