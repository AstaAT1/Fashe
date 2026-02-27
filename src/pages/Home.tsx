import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { HiArrowRight, HiOutlineTruck, HiOutlineRefresh, HiOutlineShieldCheck } from 'react-icons/hi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { api } from '@/services/api';
import { queryKeys } from '@/services/queryKeys';
import { useDocumentTitle, useReducedMotion } from '@/hooks';
import ProductCard from '@/components/product/ProductCard';
import Button from '@/components/ui/Button';
import { ProductGridSkeleton } from '@/components/ui/Skeleton';

import heroImg from '@/assets/image/banner-02.jpg';
import banner7 from '@/assets/image/banner-07.jpg';
import banner8 from '@/assets/image/banner-08.jpg';

gsap.registerPlugin(ScrollTrigger);

const stagger = {
    container: {
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } },
    },
    item: {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
    },
};

export default function Home() {
    useDocumentTitle('');
    const reduced = useReducedMotion();

    return (
        <>
            <HeroSection reduced={reduced} />
            <CategoriesSection />
            <FeaturedSection />
            <BannerSection />
            <FeaturesBar />
        </>
    );
}

/* ─── Hero ─────────────────────────────────────────────── */
function HeroSection({ reduced }: { reduced: boolean }) {
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    useEffect(() => {
        if (reduced || !titleRef.current) return;
        const words = titleRef.current.querySelectorAll('.hero-word');
        gsap.fromTo(
            words,
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.12,
                delay: 0.3,
            }
        );
    }, [reduced]);

    return (
        <section ref={heroRef} className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
            <motion.div style={{ y }} className="absolute inset-0">
                <img
                    src={heroImg}
                    alt="Fashion hero"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            </motion.div>

            <motion.div
                style={{ opacity }}
                className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
            >
                <div className="max-w-xl">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        className="text-primary-300 text-sm font-medium tracking-widest uppercase mb-4"
                    >
                        New Collection 2026
                    </motion.p>

                    <h1
                        ref={titleRef}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6"
                    >
                        {'Elevate Your Everyday Style'.split(' ').map((word, i) => (
                            <span key={i} className="hero-word inline-block mr-3" style={{ opacity: reduced ? 1 : 0 }}>
                                {word}
                            </span>
                        ))}
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="text-surface-300 text-base sm:text-lg mb-8 max-w-md"
                    >
                        Discover curated pieces that blend timeless design with modern comfort. Premium quality, honest prices.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.6 }}
                        className="flex gap-3"
                    >
                        <Link to="/shop">
                            <Button size="lg" icon={<HiArrowRight className="w-5 h-5" />}>
                                Shop Now
                            </Button>
                        </Link>
                        <Link to="/shop?category=sale">
                            <Button variant="outline" size="lg" className="!text-white !border-white/30 hover:!bg-white/10">
                                View Sale
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

/* ─── Categories ───────────────────────────────────────── */
function CategoriesSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });

    const { data: categories } = useQuery({
        queryKey: queryKeys.categories.all,
        queryFn: api.getCategories,
    });

    const displayCats = categories?.filter((c) => c.slug !== 'sale').slice(0, 4) ?? [];

    return (
        <section ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <motion.div
                variants={stagger.container}
                initial="hidden"
                animate={inView ? 'show' : 'hidden'}
            >
                <motion.div variants={stagger.item} className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-3">Shop by Category</h2>
                    <p className="text-[var(--text-secondary)] max-w-md mx-auto">
                        Find exactly what you're looking for in our curated collections
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {displayCats.map((cat) => (
                        <motion.div key={cat.id} variants={stagger.item}>
                            <Link
                                to={`/shop?category=${cat.slug}`}
                                className="group relative aspect-[3/4] rounded-2xl overflow-hidden block"
                            >
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                    <h3 className="text-white text-lg font-semibold mb-0.5">{cat.name}</h3>
                                    <p className="text-white/70 text-sm">{cat.description}</p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}

/* ─── Featured / Bestsellers ──────────────────────────── */
function FeaturedSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });

    const { data: products, isLoading } = useQuery({
        queryKey: queryKeys.products.featured(),
        queryFn: api.getFeaturedProducts,
    });

    return (
        <section ref={ref} className="bg-surface-50 dark:bg-surface-900/50 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="flex items-end justify-between mb-10"
                >
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-2">Best Sellers</h2>
                        <p className="text-[var(--text-secondary)]">Our most loved pieces this season</p>
                    </div>
                    <Link
                        to="/shop"
                        className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary-600 dark:text-primary-400 hover:gap-2 transition-all"
                    >
                        View All <HiArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>

                {isLoading ? (
                    <ProductGridSkeleton count={8} />
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {products?.slice(0, 8).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}

                <div className="mt-10 text-center sm:hidden">
                    <Link to="/shop">
                        <Button variant="outline">View All Products</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

/* ─── Banner CTA ──────────────────────────────────────── */
function BannerSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="grid md:grid-cols-2 gap-6"
            >
                <Link
                    to="/shop?category=women"
                    className="group relative h-72 md:h-96 rounded-2xl overflow-hidden"
                >
                    <img
                        src={banner7}
                        alt="Women's collection"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                    <div className="absolute bottom-6 left-6">
                        <p className="text-white/70 text-sm mb-1">Women's Collection</p>
                        <h3 className="text-white text-2xl font-bold">Spring Essentials</h3>
                    </div>
                </Link>

                <Link
                    to="/shop?category=men"
                    className="group relative h-72 md:h-96 rounded-2xl overflow-hidden"
                >
                    <img
                        src={banner8}
                        alt="Men's collection"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                    <div className="absolute bottom-6 left-6">
                        <p className="text-white/70 text-sm mb-1">Men's Collection</p>
                        <h3 className="text-white text-2xl font-bold">Modern Classics</h3>
                    </div>
                </Link>
            </motion.div>
        </section>
    );
}

/* ─── Features ─────────────────────────────────────────── */
function FeaturesBar() {
    const features = [
        { icon: HiOutlineTruck, title: 'Free Shipping', desc: 'On orders over $50' },
        { icon: HiOutlineRefresh, title: 'Easy Returns', desc: '30-day return policy' },
        { icon: HiOutlineShieldCheck, title: 'Secure Payment', desc: '100% secure checkout' },
    ];

    return (
        <section className="border-t border-[var(--border)] bg-[var(--bg)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                    {features.map(({ icon: Icon, title, desc }) => (
                        <motion.div
                            key={title}
                            whileHover={{ y: -4 }}
                            className="flex flex-col items-center gap-3"
                        >
                            <div className="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-950 flex items-center justify-center">
                                <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                            </div>
                            <h3 className="font-semibold text-sm">{title}</h3>
                            <p className="text-xs text-[var(--text-muted)]">{desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
