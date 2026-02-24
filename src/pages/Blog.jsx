import Footer from "../components/Footer/Footer";
import Nav_bar from "../components/Nav_bar/Nav_bar";
import { motion } from "framer-motion";
import { images } from "../constants";
import { Link } from "react-router-dom";
import blogs from "../data/Data";
import PageWrapper from "../components/ui/PageWrapper";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import ScrollReveal from "../components/ui/ScrollReveal";

function Blog() {
    return (
        <PageWrapper>
            <Nav_bar />

            {/* Hero */}
            <section className="relative h-40 md:h-52 bg-gradient-to-r from-gray-900 to-gray-700 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <h1 className="heading-display text-white relative z-10">News</h1>
            </section>

            <Section>
                <Container>
                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">

                        {/* Blog Posts */}
                        <div className="flex-1">
                            {blogs.map((blog, i) => (
                                <ScrollReveal key={blog.id} delay={i * 0.06}>
                                    <article className="mb-12 bg-white rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow duration-300">
                                        <div className="relative overflow-hidden">
                                            <motion.img
                                                src={blog.image}
                                                alt={blog.title}
                                                className="w-full h-56 md:h-80 object-cover"
                                                whileHover={{ scale: 1.03 }}
                                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                                loading="lazy"
                                            />
                                            <span className="absolute bottom-4 left-4 bg-[var(--color-text-primary)] text-white px-3 py-1.5 text-xs font-medium rounded-[var(--radius-sm)]">
                                                {blog.p1.split('|')[1]?.trim()}
                                            </span>
                                        </div>
                                        <div className="p-6 md:p-8">
                                            <h2 className="heading-2 mb-3">{blog.title}</h2>
                                            <div className="flex flex-wrap items-center text-small mb-4 gap-1">
                                                <span>{blog.p1.split('|')[0]?.trim()}</span>
                                                <span className="mx-1.5 text-[var(--color-border)]">•</span>
                                                <span>{blog.p1.split('|')[2]?.trim()}</span>
                                                <span className="mx-1.5 text-[var(--color-border)]">•</span>
                                                <span>{blog.p1.split('|')[3]?.trim()}</span>
                                            </div>
                                            <p className="text-body text-sm mb-5">{blog.p2.substring(0, 150)}...</p>
                                            <Link
                                                to={`/Details/${blog.id}`}
                                                className="text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-brand)] inline-flex items-center gap-1.5 transition-colors"
                                            >
                                                Continue Reading
                                                <span className="text-lg leading-none">→</span>
                                            </Link>
                                        </div>
                                    </article>
                                </ScrollReveal>
                            ))}

                            {/* Pagination */}
                            <div className="flex items-center gap-2.5">
                                <button className="w-10 h-10 rounded-full bg-[var(--color-text-primary)] text-white text-sm font-medium flex items-center justify-center">1</button>
                                <button className="w-10 h-10 rounded-full border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] hover:border-[var(--color-text-primary)] transition-colors flex items-center justify-center">2</button>
                                <button className="w-10 h-10 rounded-full border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] hover:border-[var(--color-text-primary)] transition-colors flex items-center justify-center">3</button>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="w-full lg:w-72 shrink-0 space-y-8">
                            <ScrollReveal>
                                <input
                                    type="text"
                                    placeholder="Search all articles..."
                                    className="input"
                                />
                            </ScrollReveal>

                            <ScrollReveal delay={0.05}>
                                <div>
                                    <h3 className="heading-3 mb-5">Featured Products</h3>
                                    <div className="space-y-4">
                                        {[
                                            { name: "Boxy7 T-Shirt", price: "$20.00" },
                                            { name: "Boxy6 T-Shirt", price: "$20.00" },
                                            { name: "Boxy5 T-Shirt", price: "$20.00" },
                                            { name: "Boxy4 T-Shirt", price: "$20.00" },
                                            { name: "Boxy3 T-Shirt", price: "$20.00", oldPrice: "$30.00" },
                                        ].map((p, i) => (
                                            <Link key={i} to="/" className="flex gap-3.5 group">
                                                <img
                                                    src={images.blog.blog1}
                                                    alt={p.name}
                                                    className="w-16 h-16 object-cover rounded-[var(--radius-md)] group-hover:opacity-80 transition-opacity"
                                                    loading="lazy"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-brand)] transition-colors truncate">{p.name}</h4>
                                                    {p.oldPrice ? (
                                                        <div className="flex gap-2 mt-0.5">
                                                            <span className="text-sm text-[var(--color-text-muted)] line-through">{p.oldPrice}</span>
                                                            <span className="text-sm text-[var(--color-brand)] font-medium">{p.price}</span>
                                                        </div>
                                                    ) : (
                                                        <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">{p.price}</p>
                                                    )}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={0.1}>
                                <div>
                                    <h3 className="heading-3 mb-4">Tags Cloud</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {["crafts", "street style", "fashion", "lifestyle"].map((tag) => (
                                            <button
                                                key={tag}
                                                className="px-4 py-2 bg-[var(--color-surface-subtle)] text-sm text-[var(--color-text-secondary)] rounded-full hover:bg-[var(--color-brand)] hover:text-white transition-all duration-200 cursor-pointer"
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>
                        </aside>
                    </div>
                </Container>
            </Section>

            <Footer />
        </PageWrapper>
    );
}

export default Blog;