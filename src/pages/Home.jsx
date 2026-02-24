import Footer from "../components/Footer/Footer";
import Nav_bar from "../components/Nav_bar/Nav_bar";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { images } from "../constants";
import ProductCarousel from "../components/carousel/ProductCarousel";
import PageWrapper from "../components/ui/PageWrapper";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import ScrollReveal from "../components/ui/ScrollReveal";

function Home() {
    const [currentHero, setCurrentHero] = useState(0);
    const heroSlides = [images.carousel.carousel1, images.carousel.carousel2, images.carousel.carousel3];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentHero((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, [heroSlides.length]);

    const nextHero = () => setCurrentHero((p) => (p === heroSlides.length - 1 ? 0 : p + 1));
    const prevHero = () => setCurrentHero((p) => (p === 0 ? heroSlides.length - 1 : p - 1));

    const bgStyle = (img) => ({
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    });

    const hoverAnim = {
        initial: { backgroundSize: "100% 100%" },
        animate: { backgroundSize: "100% 100%" },
        whileHover: { backgroundSize: "110% 110%" },
        transition: { duration: 0.8, ease: "easeOut" },
    };

    return (
        <PageWrapper>
            <Nav_bar />

            {/* ─── HERO CAROUSEL ─── */}
            <div className="relative w-full h-[60vh] md:h-[75vh] lg:h-[85vh] overflow-hidden bg-black">
                <AnimatePresence initial={false}>
                    <motion.div
                        key={currentHero}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <img
                            src={heroSlides[currentHero]}
                            className="w-full h-full object-cover"
                            alt={`carousel-${currentHero + 1}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center z-10 px-4 pointer-events-none">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        className="section-subtitle text-white/90 mb-4 tracking-[0.3em] uppercase text-xs md:text-sm"
                    >
                        Women Collection 2018
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                        className="heading-display text-white mb-8 tracking-wider text-4xl md:text-6xl"
                    >
                        NEW ARRIVALS
                    </motion.h1>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="pointer-events-auto">
                        <Link to="/Shop">
                            <button className="btn bg-white text-[var(--color-text-primary)] hover:bg-white/90 btn-lg px-8">
                                SHOP NOW
                            </button>
                        </Link>
                    </motion.div>
                </div>

                {/* Carousel Controls */}
                <div className="absolute inset-0 flex items-center justify-between px-4 md:px-8 pointer-events-none z-20">
                    <button
                        onClick={prevHero}
                        className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-all duration-300 group border border-white/20"
                        aria-label="Previous"
                    >
                        <svg className="w-5 h-5 text-white group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={nextHero}
                        className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-all duration-300 group border border-white/20"
                        aria-label="Next"
                    >
                        <svg className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Carousel Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {heroSlides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentHero(i)}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currentHero ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'}`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* ─── CATEGORY GRID ─── */}
            <Section>
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 auto-rows-[200px] md:auto-rows-[240px] lg:auto-rows-[260px]">
                        {/* Col 1 - Tall */}
                        <ScrollReveal delay={0} className="row-span-2">
                            <motion.div {...hoverAnim} className="relative w-full h-full rounded-[var(--radius-lg)] overflow-hidden" style={bgStyle(images.cart.card1)}>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                                <Link to="/Shop"><button className="btn bg-white/90 backdrop-blur-sm text-[var(--color-text-primary)] hover:bg-white absolute bottom-6 left-1/2 -translate-x-1/2 min-w-[140px]">Dresses</button></Link>
                            </motion.div>
                        </ScrollReveal>

                        {/* Col 2 - Short */}
                        <ScrollReveal delay={0.06}>
                            <motion.div {...hoverAnim} className="relative w-full h-full rounded-[var(--radius-lg)] overflow-hidden" style={bgStyle(images.cart.card2)}>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                                <Link to="/Shop"><button className="btn bg-white/90 backdrop-blur-sm text-[var(--color-text-primary)] hover:bg-white absolute bottom-6 left-1/2 -translate-x-1/2 min-w-[140px]">Watches</button></Link>
                            </motion.div>
                        </ScrollReveal>

                        {/* Col 3 - Tall */}
                        <ScrollReveal delay={0.12} className="row-span-2">
                            <motion.div {...hoverAnim} className="relative w-full h-full rounded-[var(--radius-lg)] overflow-hidden" style={bgStyle(images.cart.card3)}>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                                <Link to="/Shop"><button className="btn bg-white/90 backdrop-blur-sm text-[var(--color-text-primary)] hover:bg-white absolute bottom-6 left-1/2 -translate-x-1/2 min-w-[140px]">Bags</button></Link>
                            </motion.div>
                        </ScrollReveal>

                        {/* Col 1 - Short (fills second row) */}
                        <ScrollReveal delay={0.18}>
                            <motion.div {...hoverAnim} className="relative w-full h-full rounded-[var(--radius-lg)] overflow-hidden" style={bgStyle(images.cart.card4)}>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                                <Link to="/Shop"><button className="btn bg-white/90 backdrop-blur-sm text-[var(--color-text-primary)] hover:bg-white absolute bottom-6 left-1/2 -translate-x-1/2 min-w-[140px]">Sunglasses</button></Link>
                            </motion.div>
                        </ScrollReveal>

                        {/* Col 2 - Tall (spans rows 2-3) */}
                        <ScrollReveal delay={0.24} className="row-span-2">
                            <motion.div {...hoverAnim} className="relative w-full h-full rounded-[var(--radius-lg)] overflow-hidden" style={bgStyle(images.cart.card5)}>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                                <Link to="/Shop"><button className="btn bg-white/90 backdrop-blur-sm text-[var(--color-text-primary)] hover:bg-white absolute bottom-6 left-1/2 -translate-x-1/2 min-w-[140px]">Footwear</button></Link>
                            </motion.div>
                        </ScrollReveal>

                        {/* Col 3 - Short (fills third row) */}
                        <ScrollReveal delay={0.3}>
                            <motion.div {...hoverAnim} className="relative w-full h-full rounded-[var(--radius-lg)] overflow-hidden" style={bgStyle(images.cart.card6)}>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                                <Link to="/Shop"><button className="btn bg-white/90 backdrop-blur-sm text-[var(--color-text-primary)] hover:bg-white absolute bottom-6 left-1/2 -translate-x-1/2 min-w-[140px]">Accessories</button></Link>
                            </motion.div>
                        </ScrollReveal>
                    </div>
                </Container>
            </Section>

            {/* ─── PRODUCT CAROUSEL ─── */}
            <ProductCarousel />

            {/* ─── LOOKBOOK / PROMO SECTION ─── */}
            <Section bg="bg-[var(--color-surface-muted)]">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <ScrollReveal>
                            <motion.div
                                {...hoverAnim}
                                className="relative h-[400px] md:h-[480px] rounded-[var(--radius-xl)] overflow-hidden flex flex-col items-center justify-center text-white"
                                style={bgStyle(images.banner.banner8)}
                            >
                                <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/50" />
                                <div className="relative z-10 text-center">
                                    <p className="text-lg font-light tracking-wider mb-1">The Beauty</p>
                                    <h2 className="heading-display text-white mb-6">Lookbook</h2>
                                    <Link to="/Shop" className="text-sm font-medium text-white border-b border-white/50 hover:border-white pb-0.5 transition-colors">
                                        View Collection
                                    </Link>
                                </div>
                            </motion.div>
                        </ScrollReveal>

                        <ScrollReveal delay={0.1}>
                            <motion.div
                                {...hoverAnim}
                                className="relative h-[400px] md:h-[480px] rounded-[var(--radius-xl)] overflow-hidden flex flex-col justify-end items-center p-8 md:p-10"
                                style={bgStyle(images.shops.shop)}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                <div className="relative z-10 text-center text-white">
                                    <p className="text-sm font-medium mb-1 text-white/90">Boxy T-Shirt with Roll Sleeve</p>
                                    <p className="text-xl font-semibold mb-6">$20.00</p>
                                    <div className="flex gap-3 justify-center">
                                        {[
                                            { val: "365", label: "days" },
                                            { val: "08", label: "hrs" },
                                            { val: "24", label: "mins" },
                                            { val: "36", label: "secs" },
                                        ].map((t) => (
                                            <div key={t.label} className="w-16 h-16 md:w-[72px] md:h-[72px] border border-white/20 rounded-[var(--radius-lg)] bg-white/10 backdrop-blur-md flex flex-col justify-center items-center shadow-lg">
                                                <span className="text-xl font-semibold leading-none mb-1">{t.val}</span>
                                                <span className="text-[10px] uppercase tracking-wider opacity-80">{t.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </ScrollReveal>
                    </div>
                </Container>
            </Section>

            {/* ─── BLOG SECTION ─── */}
            <Section>
                <Container>
                    <ScrollReveal>
                        <div className="text-center mb-12">
                            <p className="section-subtitle mb-3">Latest News</p>
                            <h2 className="heading-1">Our Blog</h2>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[images.blog.blog1, images.blog.blog2, images.blog.blog3].map((img, i) => (
                            <ScrollReveal key={i} delay={i * 0.08}>
                                <article className="group">
                                    <Link to="/blog" className="block overflow-hidden rounded-[var(--radius-xl)] mb-5 relative">
                                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                                        <motion.img
                                            src={img}
                                            alt="Blog post"
                                            className="w-full h-56 md:h-64 object-cover"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                            loading="lazy"
                                        />
                                    </Link>
                                    <Link to="/blog">
                                        <h3 className="heading-3 group-hover:text-[var(--color-brand)] transition-colors duration-200 mb-2">
                                            Black Friday Guide: Best Sales & Discount Codes
                                        </h3>
                                    </Link>
                                    <p className="text-small mb-3">by fashe-theme Admin on Dec 28, 2017</p>
                                    <p className="text-body text-sm line-clamp-3">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed turpis sed lorem dignissim vulputate nec cursus ante. Nunc sit...
                                    </p>
                                </article>
                            </ScrollReveal>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* ─── INSTAGRAM / PERKS SECTION ─── */}
            <Section bg="bg-[var(--color-surface-muted)] text-[var(--color-text-primary)]" className="!py-16">
                <Container>
                    <ScrollReveal>
                        <h2 className="heading-3 text-center mb-12 tracking-wide">@ FOLLOW US ON INSTAGRAM</h2>
                    </ScrollReveal>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-[var(--color-border)]">
                        {[
                            { title: "Free Delivery Worldwide", desc: "Mirum est notare quam littera gothica" },
                            { title: "30 Days Return", desc: "Simply return within 30 days for an exchange" },
                            { title: "Store Opening", desc: "Shop Online 24/7 or visit our stores" },
                        ].map((perk, i) => (
                            <ScrollReveal key={i} delay={i * 0.08}>
                                <div className="flex flex-col items-center text-center px-6 py-4 md:py-0">
                                    <h3 className="font-medium text-base mb-2">{perk.title}</h3>
                                    <p className="text-sm text-[var(--color-text-muted)] max-w-xs">{perk.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </Container>
            </Section>

            <Footer />
        </PageWrapper>
    );
}

export default Home;