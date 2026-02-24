import { useParams } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Nav_bar from "../components/Nav_bar/Nav_bar";
import blogs from "../data/Data";
import { images } from "../constants";
import { Link } from "react-router-dom";



function Details() {
    const { id } = useParams()

    const pruduct = blogs.find((p) => (p.id === Number(id)))

    if (!pruduct) { return (
        <p>pruduct not found</p>
    )
        
    }


    return (
        <div>
            <Nav_bar />

            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <div className="mb-8 text-sm text-gray-600">
                    <Link to="/" className="hover:text-gray-900">Home</Link>
                    <span className="mx-2">›</span>
                    <Link to="/blog" className="hover:text-gray-900">News</Link>
                    <span className="mx-2">›</span>
                    <span className="text-gray-900">{pruduct.title}</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left Side - Blog Detail */}
                    <div className="w-full lg:w-2/3">

                        {/* Blog Image */}
                        <div className="mb-8">
                            <img
                                src={pruduct.image}
                                alt={pruduct.title}
                                className="w-full h-64 md:h-96 lg:h-[500px] object-cover rounded-lg"
                            />
                        </div>

                        {/* Blog Title */}
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {pruduct.title}
                        </h1>

                        {/* Blog Meta */}
                        <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6 gap-1">
                            <span>{pruduct.p1.split('|')[0].trim()}</span>
                            <span className="mx-2">|</span>
                            <span>{pruduct.p1.split('|')[1].trim()}</span>
                            <span className="mx-2">|</span>
                            <Link to="/" className="hover:text-red-500">{pruduct.b1}</Link>
                            <span>,</span>
                            <Link to="/" className="hover:text-red-500">{pruduct.b2}</Link>
                            <span className="mx-2">|</span>
                            <span>{pruduct.p1.split('|')[3].trim()}</span>
                        </div>

                        {/* Blog Content */}
                        <div className="prose max-w-none mb-8">
                            <p className="text-gray-700 leading-relaxed mb-4">
                                {pruduct.p2}
                            </p>

                            <p className="text-gray-700 leading-relaxed mb-4">
                                {pruduct.p3}
                            </p>
                        </div>

                        {/* Tags Cloud */}
                        <div className="mb-12">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">{pruduct.Tags}</h3>
                            <div className="flex flex-wrap gap-2">
                                <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-red-500 hover:text-white transition-colors">
                                    {pruduct.b1}
                                </button>
                                <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-red-500 hover:text-white transition-colors">
                                    {pruduct.b2}
                                </button>
                            </div>
                        </div>

                        {/* Comments Section */}
                        <div className="border-t pt-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">
                                {pruduct.p1.split('|')[3].trim().toUpperCase()} TO SHOW
                            </h3>

                            {/* Show comment only if there are comments */}
                            {pruduct.p1.includes('1 Comments') && (
                                <div className="flex gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0"></div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="font-bold text-gray-900">test name</span>
                                            <span className="text-sm text-gray-500">/ Jan 11, 2018</span>
                                            <Link to="/" className="text-sm text-gray-600 hover:text-red-500">Reply</Link>
                                        </div>
                                        <p className="text-gray-700">test message</p>
                                    </div>
                                </div>
                            )}

                            {/* Leave Comment Form */}
                            <div className="mt-12">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{pruduct.comment.toUpperCase()}</h3>
                                <p className="text-sm text-gray-600 mb-6">
                                    {pruduct.titlecomment}
                                </p>

                                <form className="space-y-4">
                                    {/* Message */}
                                    <div>
                                        <textarea
                                            placeholder="Message"
                                            rows="6"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 resize-none"
                                        ></textarea>
                                    </div>

                                    {/* Name */}
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <input
                                            type="email"
                                            placeholder="Email address"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div>
                                        <button
                                            type="submit"
                                            className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors"
                                        >
                                            {pruduct.post}
                                        </button>
                                    </div>

                                    <p className="text-sm text-gray-500 italic">
                                        {pruduct.lastcomment}
                                    </p>
                                </form>
                            </div>
                        </div>

                    </div>

                    {/* Right Side - Sidebar */}
                    <aside className="w-full lg:w-1/3">

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
                                <Link to="/product/1" className="flex gap-4 hover:opacity-80 transition-opacity">
                                    <img
                                        src={images.blog.blog1}
                                        alt="Product"
                                        className="w-20 h-24 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h4 className="text-sm text-gray-900 mb-2">Boxy7 T-Shirt with Roll Sleeve</h4>
                                        <p className="text-gray-600 font-medium">$20.00</p>
                                    </div>
                                </Link>

                                {/* Product 2 */}
                                <Link to="/product/2" className="flex gap-4 hover:opacity-80 transition-opacity">
                                    <img
                                        src={images.blog.blog1}
                                        alt="Product"
                                        className="w-20 h-24 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h4 className="text-sm text-gray-900 mb-2">Boxy6 T-Shirt with Roll Sleeve</h4>
                                        <p className="text-gray-600 font-medium">$20.00</p>
                                    </div>
                                </Link>

                                {/* Product 3 */}
                                <Link to="/" className="flex gap-4 hover:opacity-80 transition-opacity">
                                    <img
                                        src={images.blog.blog1}
                                        alt="Product"
                                        className="w-20 h-24 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h4 className="text-sm text-gray-900 mb-2">Boxy5 T-Shirt with Roll Sleeve</h4>
                                        <p className="text-gray-600 font-medium">$20.00</p>
                                    </div>
                                </Link>

                                {/* Product 4 */}
                                <Link to="/" className="flex gap-4 hover:opacity-80 transition-opacity">
                                    <img
                                        src={images.blog.blog1}
                                        alt="Product"
                                        className="w-20 h-24 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h4 className="text-sm text-gray-900 mb-2">Boxy4 T-Shirt with Roll Sleeve</h4>
                                        <p className="text-gray-600 font-medium">$20.00</p>
                                    </div>
                                </Link>

                                {/* Product 5 */}
                                <Link to="/" className="flex gap-4 hover:opacity-80 transition-opacity">
                                    <img
                                        src={images.blog.blog1}
                                        alt="Product"
                                        className="w-20 h-24 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h4 className="text-sm text-gray-900 mb-2">Boxy3 T-Shirt with Roll Sleeve</h4>
                                        <p className="text-sm text-gray-600 line-through">$30.00</p>
                                        <p className="text-red-500 font-medium">$20.00</p>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Tags Cloud */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Tags Cloud</h3>
                            <div className="flex flex-wrap gap-2">
                                <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-red-500 hover:text-white transition-colors">
                                    {pruduct.b1}
                                </button>
                                <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-red-500 hover:text-white transition-colors">
                                    {pruduct.b2}
                                </button>
                            </div>
                        </div>

                    </aside>

                </div>
            </div>


            <Footer />

        </div>
    );
}

export default Details;