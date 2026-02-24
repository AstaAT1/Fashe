import Footer from "../Footer/Footer";
import Nav_bar from "../Nav_bar/Nav_bar";
import { images } from "../../constants";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageWrapper from "../ui/PageWrapper";
import Container from "../ui/Container";
import Section from "../ui/Section";
import ScrollReveal from "../ui/ScrollReveal";

function Homeshop() {
    return (
        <PageWrapper>
            <Nav_bar />

            <Section>
                <Container>
                    {/* Breadcrumb */}
                    <ScrollReveal>
                        <nav className="mb-8 text-sm text-[var(--color-text-muted)]">
                            <Link to="/" className="hover:text-[var(--color-text-primary)] transition-colors">Home</Link>
                            <span className="mx-2">›</span>
                            <span className="text-[var(--color-text-primary)]">Collections</span>
                        </nav>
                    </ScrollReveal>

                    {/* Collections Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { img: images.shops.shop8, title: "Winter", count: 8 },
                            { img: images.shops.shop, title: "Featured", count: 8 },
                            { img: images.shops.shop8, title: "Summer", count: 8 },
                        ].map((col, i) => (
                            <ScrollReveal key={i} delay={i * 0.08}>
                                <Link to="/shop" className="group block">
                                    <div className="relative overflow-hidden rounded-[var(--radius-xl)] aspect-[3/4]">
                                        <motion.img
                                            src={col.img}
                                            alt={`${col.title} Collection`}
                                            className="w-full h-full object-cover"
                                            whileHover={{ scale: 1.04 }}
                                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                                        <div className="absolute bottom-6 left-6 text-white">
                                            <h3 className="heading-2 text-white mb-1">{col.title}</h3>
                                            <p className="text-sm text-white/80">({col.count} items)</p>
                                        </div>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>
                </Container>
            </Section>

            <Footer />
        </PageWrapper>
    );
}

export default Homeshop;