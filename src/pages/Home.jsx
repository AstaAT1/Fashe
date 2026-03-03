import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Truck, RefreshCw, Shield, Sparkles } from 'lucide-react'
import { getFeaturedProducts, getNewProducts, categories } from '@/data/products'
import ProductCard from '@/components/product/ProductCard'
import heroImg from '@/assets/image/banner-02.jpg'
import banner7 from '@/assets/image/banner-07.jpg'
import banner8 from '@/assets/image/banner-08.jpg'

const stagger = {
    container: { hidden: {}, show: { transition: { staggerChildren: 0.08 } } },
    item: { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } } },
}

export default function Home() {
    useEffect(() => { document.title = 'FASHE — Premium Fashion Store' }, [])

    return (
        <>
            <Hero />
            <Features />
            <Categories />
            <Bestsellers />
            <Banners />
            <NewArrivals />
            <Newsletter />
        </>
    )
}

function Hero() {
    return (
        <section className="relative h-[90vh] min-h-[600px] max-h-[900px] flex items-center overflow-hidden">
            <img src={heroImg} alt="Fashion" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="relative z-10 container-main w-full">
                <div className="max-w-2xl">
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-accent-light text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase mb-6">
                        New Collection 2026
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8 font-[family-name:var(--font-display)]"
                    >
                        Elevate Your Everyday Style
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-neutral-300 text-base sm:text-lg leading-relaxed mb-10 max-w-lg">
                        Discover curated pieces that blend timeless design with modern comfort. Premium quality, honest prices.
                    </motion.p>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-wrap gap-4">
                        <Link to="/shop" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary text-sm font-semibold rounded-xl hover:bg-neutral-100 transition-all hover:-translate-y-0.5">
                            Shop Now <ArrowRight size={16} />
                        </Link>
                        <Link to="/shop?category=sale" className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white text-sm font-semibold rounded-xl hover:bg-white/10 transition-all">
                            View Sale
                        </Link>
                    </motion.div>
                </div>
            </div>
            {/* Scroll indicator */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-5 h-8 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
                    <div className="w-1 h-2 bg-white/60 rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    )
}

function Features() {
    const features = [
        { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
        { icon: RefreshCw, title: 'Easy Returns', desc: '30-day return policy' },
        { icon: Shield, title: 'Secure Payment', desc: '100% secure checkout' },
        { icon: Sparkles, title: 'Premium Quality', desc: 'Handpicked materials' },
    ]
    return (
        <section className="border-b border-[var(--border)]">
            <div className="container-main py-8 lg:py-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {features.map(({ icon: Icon, title, desc }) => (
                        <div key={title} className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                                <Icon size={20} className="text-accent" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm">{title}</h3>
                                <p className="text-xs text-[var(--text-muted)]">{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function Categories() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-100px' })
    const cats = categories.filter((c) => c.slug !== 'sale').slice(0, 4)

    return (
        <section ref={ref} className="container-main section-padding">
            <motion.div variants={stagger.container} initial="hidden" animate={inView ? 'show' : 'hidden'}>
                <motion.div variants={stagger.item} className="text-center mb-14">
                    <p className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-3">Collections</p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)]">Shop by Category</h2>
                </motion.div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {cats.map((cat) => (
                        <motion.div key={cat.id} variants={stagger.item}>
                            <Link to={`/shop?category=${cat.slug}`} className="group relative aspect-[3/4] rounded-2xl overflow-hidden block">
                                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-500" />
                                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                                    <h3 className="text-white text-lg sm:text-xl font-bold font-[family-name:var(--font-display)]">{cat.name}</h3>
                                    <p className="text-white/60 text-sm mt-1">{cat.description}</p>
                                    <span className="mt-3 inline-flex items-center gap-1 text-white/80 text-xs font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                        Explore <ArrowRight size={12} />
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}

function Bestsellers() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-100px' })
    const products = getFeaturedProducts().slice(0, 8)

    return (
        <section ref={ref} className="bg-neutral-50 dark:bg-neutral-900/50 section-padding">
            <div className="container-main">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="flex items-end justify-between mb-12">
                    <div>
                        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-3">Curated for You</p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)]">Best Sellers</h2>
                    </div>
                    <Link to="/shop" className="hidden sm:flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all group">
                        View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {products.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
                <div className="mt-10 text-center sm:hidden">
                    <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border)] rounded-xl text-sm font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                        View All Products
                    </Link>
                </div>
            </div>
        </section>
    )
}

function NewArrivals() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-100px' })
    const products = getNewProducts().slice(0, 4)
    if (products.length === 0) return null

    return (
        <section ref={ref} className="container-main section-padding">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
                <p className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-3">Just In</p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)]">New Arrivals</h2>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {products.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
        </section>
    )
}

function Banners() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-100px' })

    return (
        <section ref={ref} className="container-main section-padding">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="grid md:grid-cols-2 gap-4 md:gap-6">
                {[
                    { img: banner7, cat: 'women', title: 'Spring Essentials', label: "Women's Collection" },
                    { img: banner8, cat: 'men', title: 'Modern Classics', label: "Men's Collection" },
                ].map((b) => (
                    <Link key={b.cat} to={`/shop?category=${b.cat}`} className="group relative h-72 md:h-[450px] rounded-2xl overflow-hidden">
                        <img src={b.img} alt={b.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                        <div className="absolute bottom-8 left-8">
                            <p className="text-white/60 text-xs tracking-[0.15em] uppercase mb-2">{b.label}</p>
                            <h3 className="text-white text-2xl sm:text-3xl font-bold font-[family-name:var(--font-display)] mb-4">{b.title}</h3>
                            <span className="inline-flex items-center gap-2 text-white text-sm font-medium border border-white/30 rounded-full px-5 py-2.5 group-hover:bg-white group-hover:text-black transition-all duration-300">
                                Shop Now <ArrowRight size={16} />
                            </span>
                        </div>
                    </Link>
                ))}
            </motion.div>
        </section>
    )
}

function Newsletter() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-100px' })

    return (
        <section ref={ref} className="bg-primary section-padding">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="max-w-2xl mx-auto px-4 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white font-[family-name:var(--font-display)] mb-4">Stay in the Loop</h2>
                <p className="text-neutral-400 mb-8">Subscribe for exclusive offers, new arrivals, and style tips.</p>
                <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input type="email" placeholder="Enter your email" className="flex-1 px-5 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent" />
                    <button type="submit" className="px-8 py-3.5 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent-dark transition-all">Subscribe</button>
                </form>
            </motion.div>
        </section>
    )
}
