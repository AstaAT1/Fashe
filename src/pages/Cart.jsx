import { Link } from "react-router-dom";
import Nav_bar from "../components/Nav_bar/Nav_bar";
import Footer from "../components/Footer/Footer";
import PageWrapper from "../components/ui/PageWrapper";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import ScrollReveal from "../components/ui/ScrollReveal";
import { useCart } from "../components/cartProvider/CartProvider";

export default function Cart() {
    const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

    return (
        <PageWrapper>
            <Nav_bar />

            {/* Header */}
            <section className="bg-[var(--color-surface-muted)] py-12 md:py-20 text-center">
                <Container>
                    <ScrollReveal>
                        <h1 className="heading-display mb-4">Shopping Cart</h1>
                        <nav className="text-sm text-[var(--color-text-muted)]">
                            <Link to="/" className="hover:text-[var(--color-text-primary)] transition-colors">Home</Link>
                            <span className="mx-2">›</span>
                            <span className="text-[var(--color-text-primary)]">Cart</span>
                        </nav>
                    </ScrollReveal>
                </Container>
            </section>

            <Section>
                <Container>
                    {cart.length === 0 ? (
                        <ScrollReveal>
                            <div className="text-center py-16">
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <h2 className="heading-3 mb-4">Your cart is empty</h2>
                                <p className="text-body mb-8">Looks like you haven't added anything to your cart yet.</p>
                                <Link to="/Shop" className="btn btn-primary px-8">
                                    CONTINUE SHOPPING
                                </Link>
                            </div>
                        </ScrollReveal>
                    ) : (
                        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">

                            {/* Cart Items */}
                            <div className="flex-1">
                                <ScrollReveal>
                                    <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        <div className="col-span-6">Product</div>
                                        <div className="col-span-2 text-center">Price</div>
                                        <div className="col-span-2 text-center">Quantity</div>
                                        <div className="col-span-2 text-right">Total</div>
                                    </div>
                                </ScrollReveal>

                                <div className="divide-y divide-gray-200">
                                    {cart.map((item, i) => {
                                        const itemPrice = parseFloat(item.price.replace('$', ''));
                                        const itemTotal = (itemPrice * item.quantity).toFixed(2);

                                        return (
                                            <ScrollReveal key={item.id} delay={i * 0.05} className="py-6 flex flex-col md:grid md:grid-cols-12 gap-4 items-center">
                                                {/* Product Info */}
                                                <div className="col-span-6 flex items-center gap-4 w-full">
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-gray-400 hover:text-red-500 transition-colors shrink-0 p-2"
                                                        aria-label="Remove item"
                                                    >
                                                        ✕
                                                    </button>
                                                    <Link to={`/Details/${item.id}`} className="shrink-0">
                                                        <img src={item.img} alt={item.title} className="w-20 h-24 object-cover rounded-[var(--radius-sm)] bg-[var(--color-surface-subtle)]" />
                                                    </Link>
                                                    <Link to={`/Details/${item.id}`} className="font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors line-clamp-2">
                                                        {item.title}
                                                    </Link>
                                                </div>

                                                {/* Price (Desktop) */}
                                                <div className="col-span-2 text-center hidden md:block text-gray-600">
                                                    {item.price}
                                                </div>

                                                {/* Quantity & Price (Mobile) */}
                                                <div className="col-span-2 flex justify-between w-full md:w-auto md:justify-center items-center mt-4 md:mt-0">
                                                    <span className="md:hidden text-gray-500 text-sm">Quantity:</span>
                                                    <div className="flex items-center border border-gray-300 rounded-[var(--radius-sm)]">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                                                        >
                                                            -
                                                        </button>
                                                        <div className="w-10 h-8 flex items-center justify-center text-sm font-medium border-x border-gray-300 bg-gray-50">
                                                            {item.quantity}
                                                        </div>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Total Line Price */}
                                                <div className="col-span-2 flex justify-between w-full md:w-auto md:justify-end items-center mt-2 md:mt-0">
                                                    <span className="md:hidden text-gray-500 text-sm">Total:</span>
                                                    <span className="font-medium text-gray-900">${itemTotal}</span>
                                                </div>
                                            </ScrollReveal>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="w-full lg:w-[380px] shrink-0">
                                <ScrollReveal delay={0.1}>
                                    <div className="bg-[var(--color-surface-subtle)] rounded-[var(--radius-xl)] p-8">
                                        <h2 className="heading-3 mb-6 pb-4 border-b border-[var(--color-border)]">Cart Totals</h2>

                                        <div className="flex justify-between items-center mb-4 text-sm">
                                            <span className="text-gray-600">Subtotal</span>
                                            <span className="font-medium text-gray-900">${getCartTotal().toFixed(2)}</span>
                                        </div>

                                        <div className="flex justify-between items-center mb-6 pb-6 border-b border-[var(--color-border-muted)] text-sm">
                                            <span className="text-gray-600">Shipping</span>
                                            <span className="text-gray-500 italic">Calculated at checkout</span>
                                        </div>

                                        <div className="flex justify-between items-center mb-8">
                                            <span className="text-lg font-medium text-gray-900">Total</span>
                                            <span className="text-xl font-semibold text-[var(--color-brand)]">${getCartTotal().toFixed(2)}</span>
                                        </div>

                                        <button className="btn btn-primary w-full py-4 text-sm tracking-widest">
                                            PROCEED TO CHECKOUT
                                        </button>
                                    </div>
                                </ScrollReveal>
                            </div>

                        </div>
                    )}
                </Container>
            </Section>
            <Footer />
        </PageWrapper>
    );
}
