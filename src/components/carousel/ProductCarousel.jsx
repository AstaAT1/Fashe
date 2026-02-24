import { useState, useRef, useEffect } from "react";
import { useCart } from "../cartProvider/CartProvider";
import CartModal from "../cartProvider/cartmodal";
import Container from "../ui/Container";
import Section from "../ui/Section";
import ScrollReveal from "../ui/ScrollReveal";
import { products } from "../../data/products";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProductCarousel() {
  const [hoveredId, setHoveredId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);
  const { addToCart } = useCart();
  const carouselRef = useRef(null);

  const handleAddToCart = (e, product) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation();
    addToCart(product);
    setAddedProduct(product);
    setShowModal(true);
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <Section bg="bg-[var(--color-surface-muted)]">
      {showModal && (
        <CartModal product={addedProduct} onClose={() => setShowModal(false)} />
      )}

      <Container>
        <ScrollReveal>
          <div className="flex items-center justify-between mb-10">
            <h2 className="heading-2">Our Products</h2>
            <div className="flex gap-2">
              <button
                onClick={scrollLeft}
                className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)] hover:border-[var(--color-text-primary)] hover:text-[var(--color-text-primary)] transition-all duration-200"
                aria-label="Previous"
              >
                &#10094;
              </button>
              <button
                onClick={scrollRight}
                className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)] hover:border-[var(--color-text-primary)] hover:text-[var(--color-text-primary)] transition-all duration-200"
                aria-label="Next"
              >
                &#10095;
              </button>
            </div>
          </div>
        </ScrollReveal>

        <div className="relative">
          <div
            ref={carouselRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory hide-scroll-bar pb-4"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {products.map((product, i) => (
              <ScrollReveal key={product.id} delay={i * 0.05} className="shrink-0 w-[260px] sm:w-[280px] snap-start">
                <Link to={`/Details/${product.id}`} className="block group">
                  <div
                    className="relative bg-[var(--color-surface-subtle)] overflow-hidden rounded-[var(--radius-lg)] aspect-[3/4]"
                    onMouseEnter={() => setHoveredId(product.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    {product.sale && (
                      <span className="absolute top-3 left-3 bg-[var(--color-brand)] text-white text-[11px] font-semibold px-3 py-1 rounded-full z-10">
                        Sale
                      </span>
                    )}
                    <motion.img
                      src={product.img}
                      alt={product.title}
                      className="w-full h-full object-cover"
                      animate={{ scale: hoveredId === product.id ? 1.04 : 1 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      loading="lazy"
                    />
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="absolute bottom-4 left-1/2 btn btn-primary text-xs w-[80%] max-w-[200px]"
                      style={{
                        opacity: hoveredId === product.id ? 1 : 0,
                        transform: hoveredId === product.id
                          ? 'translateX(-50%) translateY(0)'
                          : 'translateX(-50%) translateY(12px)',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors line-clamp-1">{product.title}</h3>
                    <div className="mt-1 flex items-center gap-2">
                      {product.oldPrice ? (
                        <>
                          <span className="text-sm text-[var(--color-text-muted)] line-through">{product.oldPrice}</span>
                          <span className="text-sm font-semibold text-[var(--color-brand)]">{product.price}</span>
                        </>
                      ) : (
                        <span className="text-sm font-medium text-[var(--color-text-primary)]">{product.price}</span>
                      )}
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}