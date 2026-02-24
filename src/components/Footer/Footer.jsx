import { FaFacebookF, FaInstagram, FaPinterest, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import Container from "../ui/Container";

function Footer() {
    return (
        <footer className="bg-[var(--color-surface-subtle)] border-t border-[var(--color-border-muted)]">
            <Container className="pt-16 pb-10 md:pt-20 md:pb-12">
                {/* Footer Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
                    {/* Get In Touch */}
                    <div className="sm:col-span-2 lg:col-span-2">
                        <h3 className="heading-3 mb-4">Get In Touch</h3>
                        <p className="text-body mb-6 max-w-sm">
                            Any questions? Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018 or call us on (+1) 96 716 6879
                        </p>
                        <div className="flex items-center gap-3">
                            {[FaFacebookF, FaTwitter, FaPinterest, FaInstagram].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-9 h-9 rounded-full bg-[var(--color-border-muted)] flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-brand)] hover:text-white transition-all duration-200"
                                    aria-label={Icon.name}
                                >
                                    <Icon className="w-3.5 h-3.5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-primary)] mb-4">
                            Categories
                        </h3>
                        <ul className="space-y-2.5">
                            {["Men", "Women", "Dresses", "Sunglasses"].map((item) => (
                                <li key={item}>
                                    <Link to="/Shop" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors duration-150">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-primary)] mb-4">
                            Help
                        </h3>
                        <ul className="space-y-2.5">
                            {["Track Order", "Returns", "Shipping", "FAQs"].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors duration-150">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-primary)] mb-4">
                            Newsletter
                        </h3>
                        <div className="flex flex-col gap-3">
                            <input
                                className="input"
                                type="email"
                                placeholder="Email address"
                            />
                            <button className="btn btn-primary w-full">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-14 pt-6 border-t border-[var(--color-border)]">
                    <p className="text-small text-center">
                        © {new Date().getFullYear()} FASHE. All rights reserved.
                    </p>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;