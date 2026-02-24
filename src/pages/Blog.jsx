import Footer from "../components/Footer/Footer";
import Nav_bar from "../components/Nav_bar/Nav_bar";
import { motion } from "framer-motion";
import { images } from "../constants";
import { Link } from "react-router-dom";
import blogs from "../data/Data";



function Blog() {



    const animation = {
        initial: { backgroundSize: "100% 100%" },
        animate: { backgroundSize: "100% 100%" },
        whileHover: { backgroundSize: "110% 110%" },
        transition: { duration: 0.4, ease: "easeOut" }
    };
    return (
        <div>
            <Nav_bar />





            <div className="container mx-auto px-4 py-8 md:py-12">
                {/* Hero Section with "NEWS" */}
                <div className="relative h-32 md:h-40 mb-12 overflow-hidden rounded-lg bg-gray-800">
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">NEWS</h1>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left Side - Blog Posts */}
                    <div className="w-full lg:w-2/3">

                        {/* Map through blogs data */}
                        {blogs.map((blog) => (
                            <div key={blog.id} className="mb-12 bg-white rounded-lg overflow-hidden shadow-sm">
                                <motion.div
                                    {...animation}
                                    className="relative"
                                >
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-64 md:h-96 object-cover"
                                    />
                                    <span className="absolute bottom-4 left-4 bg-black text-white px-4 py-2 text-sm">
                                        {blog.p1.split('|')[1].trim()}
                                    </span>
                                </motion.div>

                                <div className="p-6">
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                                        {blog.title}
                                    </h2>

                                    <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4 gap-1">
                                        <span>{blog.p1.split('|')[0].trim()}</span>
                                        <span className="mx-2">|</span>
                                        <span>{blog.p1.split('|')[2].trim()}</span>
                                        <span className="mx-2">|</span>
                                        <span>{blog.p1.split('|')[3].trim()}</span>
                                    </div>

                                    <p className="text-gray-600 mb-4">
                                        {blog.p2.substring(0, 150)}...
                                    </p>

                                    <Link
                                        to={`/Details/${blog.id}`}
                                        className="text-gray-900 font-medium hover:text-red-500 inline-flex items-center"
                                    >
                                        Continue Reading →
                                    </Link>
                                </div>
                            </div>
                        ))}

                        {/* Pagination */}
                        <div className="flex items-center gap-2">
                            <button className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                                1
                            </button>
                            <button className="w-10 h-10 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 flex items-center justify-center">
                                2
                            </button>
                            <button className="w-10 h-10 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 flex items-center justify-center">
                                3
                            </button>
                        </div>

                    </div>

                    {/* Right Side - Sidebar */}
                    <div className="w-full lg:w-1/3">

                        {/* Search Box */}
                        <div className="mb-8">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search all articles..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
                                />
                                <button className="absolute right-3 top-1/2 -translate-y-1/2">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Featured Products */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Featured Products</h3>

                            <div className="space-y-4">
                                {/* Product 1 */}
                                <Link to="/" className="flex gap-4 hover:opacity-80 transition-opacity">
                                    <img
                                        src={images.blog.blog1}
                                        alt="Product"
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h4 className="text-sm text-gray-900 mb-1">Boxy7 T-Shirt with Roll Sleeve</h4>
                                        <p className="text-gray-600">$20.00</p>
                                    </div>
                                </Link>

                                {/* Product 2 */}
                                <Link to="/" className="flex gap-4 hover:opacity-80 transition-opacity">
                                    <img
                                        src={images.blog.blog1}
                                        alt="Product"
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h4 className="text-sm text-gray-900 mb-1">Boxy6 T-Shirt with Roll Sleeve</h4>
                                        <p className="text-gray-600">$20.00</p>
                                    </div>
                                </Link>

                                {/* Product 3 */}
                                <Link to="/" className="flex gap-4 hover:opacity-80 transition-opacity">
                                    <img
                                        src={images.blog.blog1}
                                        alt="Product"
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h4 className="text-sm text-gray-900 mb-1">Boxy5 T-Shirt with Roll Sleeve</h4>
                                        <p className="text-gray-600">$20.00</p>
                                    </div>
                                </Link>

                                {/* Product 4 */}
                                <Link to="/product/4" className="flex gap-4 hover:opacity-80 transition-opacity">
                                    <img
                                        src={images.blog.blog1}
                                        alt="Product"
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h4 className="text-sm text-gray-900 mb-1">Boxy4 T-Shirt with Roll Sleeve</h4>
                                        <p className="text-gray-600">$20.00</p>
                                    </div>
                                </Link>

                                {/* Product 5 */}
                                <Link to="/" className="flex gap-4 hover:opacity-80 transition-opacity">
                                    <img
                                        src={images.blog.blog1}
                                        alt="Product"
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h4 className="text-sm text-gray-900 mb-1">Boxy3 T-Shirt with Roll Sleeve</h4>
                                        <p className="text-sm text-gray-600 line-through">$30.00</p>
                                        <p className="text-red-500">$20.00</p>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Tags Cloud */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Tags Cloud</h3>
                            <div className="flex flex-wrap gap-2">
                                <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-red-500 hover:text-white transition-colors cursor-pointer">
                                    crafts
                                </button>
                                <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-red-500 hover:text-white transition-colors cursor-pointer">
                                    street style
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>




            <Footer />

        </div>
    );
}

export default Blog;