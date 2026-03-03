import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import visa from '@/assets/image/visa.png.webp'
import mastercard from '@/assets/image/mastercard.png.webp'
import paypal from '@/assets/image/paypal.png.webp'
import discover from '@/assets/image/discover.png.webp'

export default function Footer() {
    return (
        <footer className="bg-neutral-950 text-neutral-400 mt-auto">
            <div className="container-main py-16 lg:py-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
                    {/* Brand */}
                    <div className="sm:col-span-2 lg:col-span-4">
                        <Link to="/" className="inline-block text-2xl font-bold text-white tracking-[0.15em] mb-4 font-[family-name:var(--font-display)]">FASHE</Link>
                        <p className="text-sm leading-relaxed mb-6 max-w-xs">Premium fashion curated for the modern individual. Quality pieces that stand the test of time.</p>
                    </div>
                    {/* Shop */}
                    <div className="lg:col-span-2">
                        <h3 className="text-xs font-semibold text-white uppercase tracking-[0.2em] mb-5">Shop</h3>
                        <ul className="space-y-3">
                            {['Women', 'Men', 'Accessories', 'Shoes', 'Sale'].map((s) => (
                                <li key={s}><Link to={`/shop?category=${s.toLowerCase()}`} className="text-sm hover:text-white transition-colors">{s}</Link></li>
                            ))}
                        </ul>
                    </div>
                    {/* Company */}
                    <div className="lg:col-span-2">
                        <h3 className="text-xs font-semibold text-white uppercase tracking-[0.2em] mb-5">Company</h3>
                        <ul className="space-y-3">
                            {[{ l: 'About Us', t: '/about' }, { l: 'Contact', t: '/contact' }, { l: 'Orders', t: '/orders' }].map((s) => (
                                <li key={s.l}><Link to={s.t} className="text-sm hover:text-white transition-colors">{s.l}</Link></li>
                            ))}
                        </ul>
                    </div>
                    {/* Newsletter */}
                    <div className="sm:col-span-2 lg:col-span-4">
                        <h3 className="text-xs font-semibold text-white uppercase tracking-[0.2em] mb-5">Newsletter</h3>
                        <p className="text-sm mb-4">Get 10% off your first order when you sign up.</p>
                        <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
                            <div className="relative flex-1">
                                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                                <input type="email" placeholder="Your email" className="w-full pl-10 pr-3 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-accent transition-all" />
                            </div>
                            <button type="submit" className="px-5 py-3 bg-white text-neutral-950 text-sm font-semibold rounded-xl hover:bg-neutral-200 transition-all">Join</button>
                        </form>
                    </div>
                </div>
                <div className="mt-14 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-neutral-500">© {new Date().getFullYear()} FASHE. All rights reserved.</p>
                    <div className="flex items-center gap-3">
                        {[visa, mastercard, paypal, discover].map((src, i) => (
                            <img key={i} src={src} alt="Payment" className="h-6 opacity-50 hover:opacity-100 transition-opacity" />
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
