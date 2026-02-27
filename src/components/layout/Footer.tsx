import { Link } from 'react-router-dom';
import { HiOutlineMail } from 'react-icons/hi';
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterestP } from 'react-icons/fa';
import visa from '@/assets/image/visa.png.webp';
import mastercard from '@/assets/image/mastercard.png.webp';
import paypal from '@/assets/image/paypal.png.webp';
import discover from '@/assets/image/discover.png.webp';

export default function Footer() {
    return (
        <footer className="bg-surface-950 text-surface-300 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
                    {/* Brand */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <Link to="/" className="inline-block text-2xl font-bold text-white tracking-tight mb-4">
                            FASHE
                        </Link>
                        <p className="text-sm leading-relaxed mb-6 max-w-xs">
                            Premium fashion curated for the modern individual. Quality pieces that last.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { icon: FaFacebookF, label: 'Facebook' },
                                { icon: FaInstagram, label: 'Instagram' },
                                { icon: FaTwitter, label: 'Twitter' },
                                { icon: FaPinterestP, label: 'Pinterest' },
                            ].map(({ icon: Icon, label }) => (
                                <a
                                    key={label}
                                    href="#"
                                    aria-label={label}
                                    className="w-9 h-9 rounded-full bg-surface-800 hover:bg-primary-600 flex items-center justify-center transition-colors duration-200"
                                >
                                    <Icon className="w-3.5 h-3.5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Shop</h3>
                        <ul className="space-y-2.5">
                            {['Women', 'Men', 'Accessories', 'Shoes', 'Sale'].map((item) => (
                                <li key={item}>
                                    <Link
                                        to={`/shop?category=${item.toLowerCase()}`}
                                        className="text-sm hover:text-white transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
                        <ul className="space-y-2.5">
                            {[
                                { label: 'About Us', to: '/about' },
                                { label: 'Contact', to: '/contact' },
                                { label: 'Careers', to: '#' },
                                { label: 'Privacy Policy', to: '#' },
                                { label: 'Terms of Service', to: '#' },
                            ].map((item) => (
                                <li key={item.label}>
                                    <Link to={item.to} className="text-sm hover:text-white transition-colors">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Newsletter</h3>
                        <p className="text-sm mb-4">Get 10% off your first order when you sign up.</p>
                        <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
                            <div className="relative flex-1">
                                <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="w-full pl-9 pr-3 py-2.5 bg-surface-800 border border-surface-700 rounded-lg text-sm text-white placeholder:text-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-4 py-2.5 bg-white text-surface-950 text-sm font-medium rounded-lg hover:bg-surface-200 transition-colors"
                            >
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-8 border-t border-surface-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-surface-500">
                        © {new Date().getFullYear()} FASHE. All rights reserved.
                    </p>
                    <div className="flex items-center gap-3">
                        {[visa, mastercard, paypal, discover].map((src, i) => (
                            <img key={i} src={src} alt="Payment method" className="h-5 opacity-60 hover:opacity-100 transition-opacity" />
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
