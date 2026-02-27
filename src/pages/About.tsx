import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useDocumentTitle } from '@/hooks';
import bgImg from '@/assets/image/bg-video-01.jpg.webp';

export default function About() {
    useDocumentTitle('About');
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <div>
            {/* Hero */}
            <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden">
                <img src={bgImg} alt="About FASHE" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50" />
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="relative text-center text-white px-4"
                >
                    <h1 className="text-4xl sm:text-5xl font-bold mb-3">Our Story</h1>
                    <p className="text-lg text-white/80 max-w-md mx-auto">
                        Thoughtfully designed fashion for the modern world
                    </p>
                </motion.div>
            </section>

            {/* Content */}
            <section ref={ref} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="prose prose-lg dark:prose-invert max-w-none"
                >
                    <h2 className="text-2xl font-bold mb-6">Who We Are</h2>
                    <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                        FASHE was born from a simple idea: that great fashion shouldn't come at the expense of quality, sustainability, or your wallet. We partner with artisans and ethical manufacturers around the world to bring you pieces that look exceptional and feel even better.
                    </p>

                    <h2 className="text-2xl font-bold mb-6">Our Philosophy</h2>
                    <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                        We believe in the power of a well-curated wardrobe. Every piece in our collection is chosen for its versatility, craftsmanship, and timeless appeal. We don't chase trends — we create enduring style.
                    </p>

                    <div className="grid sm:grid-cols-3 gap-8 mt-12 text-center">
                        {[
                            { number: '10K+', label: 'Happy Customers' },
                            { number: '500+', label: 'Products' },
                            { number: '25+', label: 'Countries' },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">{stat.number}</p>
                                <p className="text-sm text-[var(--text-muted)] mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
