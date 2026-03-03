import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import bgImg from '@/assets/image/bg-video-01.jpg.webp'

export default function About() {
    useEffect(() => { document.title = 'About — FASHE' }, [])
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-100px' })

    return (
        <div>
            {/* Hero */}
            <section className="relative h-[55vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <img src={bgImg} alt="About FASHE" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/55" />
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative text-center text-white px-4">
                    <p className="text-accent-light text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase mb-4">Since 2020</p>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 font-[family-name:var(--font-display)]">Our Story</h1>
                    <p className="text-lg text-white/70 max-w-lg mx-auto">Thoughtfully designed fashion for the modern world</p>
                </motion.div>
            </section>

            <section ref={ref} className="container-main section-padding">
                <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-16 mb-20">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold mb-6 font-[family-name:var(--font-display)]">Who We Are</h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                FASHE was born from a simple idea: that great fashion shouldn't come at the expense of quality, sustainability, or your wallet. We partner with artisans and ethical manufacturers around the world to bring you pieces that look exceptional and feel even better.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold mb-6 font-[family-name:var(--font-display)]">Our Philosophy</h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                We believe in the power of a well-curated wardrobe. Every piece in our collection is chosen for its versatility, craftsmanship, and timeless appeal. We don't chase trends — we create enduring style.
                            </p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 bg-neutral-50 dark:bg-neutral-900 rounded-3xl p-8 sm:p-12 mb-20">
                        {[
                            { number: '10K+', label: 'Happy Customers' },
                            { number: '500+', label: 'Products' },
                            { number: '25+', label: 'Countries' },
                        ].map((s) => (
                            <div key={s.label} className="text-center">
                                <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent mb-2 font-[family-name:var(--font-display)]">{s.number}</p>
                                <p className="text-sm text-[var(--text-muted)]">{s.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Values */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: 'Quality First', desc: 'Every piece is tested for durability, comfort, and lasting style.' },
                            { title: 'Ethical Sourcing', desc: 'We work only with verified suppliers who meet our fair labor standards.' },
                            { title: 'Customer Love', desc: 'Your satisfaction drives everything we do — from design to delivery.' },
                        ].map((v) => (
                            <div key={v.title} className="text-center">
                                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-xl text-accent">✦</span>
                                </div>
                                <h3 className="font-bold text-lg mb-2 font-[family-name:var(--font-display)]">{v.title}</h3>
                                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section>
        </div>
    )
}
