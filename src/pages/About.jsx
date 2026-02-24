import Footer from "../components/Footer/Footer";
import Nav_bar from "../components/Nav_bar/Nav_bar";
import { images } from "../constants";
import { motion } from "framer-motion";
import PageWrapper from "../components/ui/PageWrapper";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import ScrollReveal from "../components/ui/ScrollReveal";

function About() {
    return (
        <PageWrapper>
            <Nav_bar />

            {/* Hero */}
            <section className="relative h-48 md:h-64 bg-gradient-to-r from-stone-800 to-stone-600 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <h1 className="heading-display text-white relative z-10">About</h1>
            </section>

            {/* Story */}
            <Section>
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 lg:gap-14">
                        <ScrollReveal>
                            <motion.div
                                className="w-full aspect-[3/4] lg:aspect-auto lg:min-h-[500px] rounded-[var(--radius-xl)] overflow-hidden"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <img
                                    src={images.item_cart.item_cart1}
                                    alt="Our story"
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </motion.div>
                        </ScrollReveal>

                        <ScrollReveal delay={0.1}>
                            <div className="flex flex-col justify-center">
                                <h2 className="heading-1 mb-6">Our Story</h2>
                                <p className="text-body mb-8">
                                    Phasellus egestas nisi nisi, lobortis ultricies risus semper nec. Vestibulum pharetra ac ante ut pellentesque. Curabitur fringilla dolor quis lorem accumsan, vitae molestie urna dapibus. Pellentesque porta est ac neque bibendum viverra. Vivamus lobortis magna ut interdum laoreet. Donec gravida lorem elit, quis condimentum ex semper sit amet. Fusce eget ligula magna. Aliquam aliquam imperdiet sodales. Ut fringilla turpis in vehicula vehicula. Pellentesque congue ac orci ut gravida.
                                </p>
                                <div className="flex gap-5">
                                    <span className="w-0.5 bg-[var(--color-text-primary)] shrink-0" />
                                    <blockquote className="flex flex-col gap-3">
                                        <p className="text-body italic">
                                            "Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn't really do it, they just saw something. It seemed obvious to them after a while."
                                        </p>
                                        <cite className="text-sm font-medium text-[var(--color-text-primary)] not-italic">
                                            — Steve Jobs
                                        </cite>
                                    </blockquote>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </Container>
            </Section>

            <Footer />
        </PageWrapper>
    );
}

export default About;