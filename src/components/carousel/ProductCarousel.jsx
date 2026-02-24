import { useState } from "react";
import { images } from "../../constants";

import { useCart } from "../cartProvider/CartProvider";
import CartModal from "../cartProvider/cartmodal";


const products = [
  { id: 1, img: images.shops.shop6, title: "Boxy T-Shirt with Roll Sleeve", price: "$20.00" },
  { id: 2, img: images.shops.shop7, title: "Boxy T-Shirt with Roll Sleeve", price: "$20.00" },
  { id: 3, img: images.shops.shop8, title: "Boxy T-Shirt with Roll Sleeve", price: "$20.00" },
  { id: 4, img: images.shops.shopy3, title: "Boxy T-Shirt with Roll Sleeve", price: "$20.00" },
  { id: 5, img: images.shops.shopy4, title: "Boxy T-Shirt with Roll Sleeve", price: "$20.00" },
  { id: 6, img: images.shops.shopy5, title: "Boxy T-Shirt with Roll Sleeve", price: "$20.00" },
  { id: 7, img: images.shops.shopi, title: "Boxy T-Shirt with Roll Sleeve", price: "$20.00" },
  { id: 8, img: images.shops.shop, title: "Boxy T-Shirt with Roll Sleeve", price: "$20.00" },
];

export default function ProductCarousel() {
  const [index, setIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);

  const { addToCart } = useCart();

  const next = () => {
    if (index < 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    } else {
      setIndex(1);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedProduct(product);
    setShowModal(true);
  };

  return (
    <div className="relative bg-gray-100 overflow-hidden">
      {/* Cart Modal */}
      {showModal && (
        <CartModal
          product={addedProduct}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* Slides */}
      <div className="relative bg-gray-100 py-16 px-20 overflow-hidden">
        <div className="relative bg-gray-100 py-16 px-20 overflow-hidden">
          <div
            className="flex gap-10 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)`, width: '200%' }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="shrink-0"
                style={{ width: 'calc((50% - 15px) / 4)' }}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="w-full h-96 overflow-hidden bg-gray-200 relative">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />

                  {/* ADD TO CART Button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:bg-gray-800"
                    style={{
                      opacity: hoveredId === product.id ? 1 : 0,
                      transform: hoveredId === product.id
                        ? 'translateX(-50%) translateY(0)'
                        : 'translateX(-50%) translateY(20px)'
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>

                <div className="mt-6">
                  <h3 className="text-gray-600 text-sm">
                    {product.title}
                  </h3>
                  <p className="mt-2 text-gray-900 font-medium">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Left Arrow */}
      <button
        onClick={prev}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black text-3xl z-10"
      >
        &#10094;
      </button>

      {/* Right Arrow */}
      <button
        onClick={next}
        className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black text-3xl z-10"
      >
        &#10095;
      </button>
    </div>
  );
}