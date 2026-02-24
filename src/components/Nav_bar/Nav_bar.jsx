import { FaFacebookF, FaTwitter, FaPinterest, FaInstagram } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineShoppingBag, HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { images } from "../../constants";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../cartProvider/CartProvider";
import { useState, useEffect } from "react";
import Container from "../ui/Container";

const NAV_LINKS = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/blog", label: "Blog" },
    { to: "/About", label: "About" },
    { to: "/contact", label: "Contact" },
];

function Nav_bar() {
    const { getCartCount } = useCart();
    const cartCount = getCartCount();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    const isActive = (path) => {
        if (path === "/") return location.pathname === "/";
        return location.pathname.toLowerCase().startsWith(path.toLowerCase());
    };

    return (
        <nav className="relative z-50">
            {/* Top Bar */}
            <div className="bg-[var(--color-surface-muted)] border-b border-[var(--color-border-muted)] hidden md:block">
                <Container className="flex items-center justify-between py-2.5">
                    <div className="flex items-center gap-3">
                        {[FaFacebookF, FaTwitter, FaPinterest, FaInstagram].map((Icon, i) => (
                            <a
                                key={i}
                                href="#"
                                className="text-[var(--color-text-muted)] hover:text-[var(--color-brand)] transition-colors duration-200 text-sm"
                                aria-label={Icon.name}
                            >
                                <Icon />
                            </a>
                        ))}
                    </div>
                    <p className="text-small">Free shipping for standard order over $100</p>
                    <div className="flex items-center gap-4">
                        <span className="text-small">fashe@example.com</span>
                        <select className="text-small bg-transparent border-none outline-none cursor-pointer">
                            <option>USD</option>
                            <option>EUR</option>
                            <option>GBP</option>
                        </select>
                    </div>
                </Container>
            </div>

            {/* Main Navbar */}
            <div
                className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-shadow duration-300 ${scrolled ? "shadow-[var(--shadow-md)]" : "shadow-[var(--shadow-xs)]"
                    }`}
            >
                <Container className="flex items-center justify-between h-16 md:h-[72px]">
                    {/* Logo */}
                    <Link to="/" className="shrink-0">
                        <img src={images.logo_bzaf.logo} alt="FASHE" className="h-5 md:h-6" />
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-6 lg:gap-8">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`nav-link ${isActive(link.to) ? "active" : ""}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        <Link
                            to="/Signin"
                            className="text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors duration-200"
                            aria-label="Account"
                        >
                            <FaRegUserCircle className="w-5 h-5" />
                        </Link>

                        <span className="hidden md:block w-px h-5 bg-[var(--color-border)]" />

                        <Link to="/cart" className="relative text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors duration-200">
                            <HiOutlineShoppingBag className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[var(--color-brand)] text-white text-[10px] font-bold rounded-full w-[18px] h-[18px] flex items-center justify-center leading-none">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-1.5 text-[var(--color-text-primary)] hover:text-[var(--color-brand)] transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
                        </button>
                    </div>
                </Container>
            </div>

            {/* Mobile Drawer */}
            {mobileOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
                        onClick={() => setMobileOpen(false)}
                    />

                    {/* Drawer */}
                    <div className="fixed top-0 right-0 h-full w-72 bg-white shadow-[var(--shadow-xl)] z-50 md:hidden transform transition-transform duration-300">
                        <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
                            <Link to="/" className="shrink-0">
                                <img src={images.logo_bzaf.logo} alt="FASHE" className="h-5" />
                            </Link>
                            <button
                                onClick={() => setMobileOpen(false)}
                                className="p-1.5 text-[var(--color-text-secondary)] hover:text-[var(--color-brand)]"
                            >
                                <HiOutlineX className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex flex-col py-4">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`px-6 py-3 text-sm font-medium transition-colors duration-150 ${isActive(link.to)
                                        ? "text-[var(--color-brand)] bg-[var(--color-surface-muted)]"
                                        : "text-[var(--color-text-primary)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-brand)]"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                        <div className="px-6 py-4 border-t border-[var(--color-border)]">
                            <p className="text-small mb-2">fashe@example.com</p>
                            <p className="text-small">Free shipping over $100</p>
                        </div>
                    </div>
                </>
            )}
        </nav>
    );
}

export default Nav_bar;