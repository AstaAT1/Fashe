// components/CartModal/CartModal.jsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CartModal({ product, onClose }) {
  // Auto-close after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Product Info */}
        <h3 className="text-xl font-bold text-center text-gray-900 mb-2">
          {product.title}
        </h3>
        <p className="text-center text-gray-600 mb-6">is added to cart!</p>

        {/* OK Button */}
        <Link to="/cart">
          <button
            onClick={onClose}
            className="w-full bg-red-500 text-white py-3 rounded-full hover:bg-red-600 transition-colors font-medium"
          >
            VIEW CART
          </button>
        </Link>

        <button
          onClick={onClose}
          className="w-full mt-3 bg-gray-200 text-gray-700 py-3 rounded-full hover:bg-gray-300 transition-colors font-medium"
        >
          CONTINUE SHOPPING
        </button>
      </div>
    </div>
  );
}