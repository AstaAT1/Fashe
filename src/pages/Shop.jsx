
import Nav_bar from "../components/Nav_bar/Nav_bar";
import Footer from "../components/Footer/Footer";
import { images } from "../constants";
import { motion } from "framer-motion";
import { useState } from "react";


import { useCart } from "../components/cartProvider/CartProvider";
import CartModal from "../components/cartProvider/cartmodal";


function Shop() {

    // const [index, setIndex] = useState(0);
    const [hoveredId, setHoveredId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [addedProduct, setAddedProduct] = useState(null);

    const { addToCart } = useCart();

    const products = Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        title: `Boxy T-Shirt with Roll Sleeve`,
        img: images.shopss[i],

        sale: i + 1 == 5,

        oldPrice: i + 1 == 5 ? "$30.00" : null,
        price: i + 1 == 5 ? "$20.00" : "$30.00",
    }))

    const animation = {
        initial: { scale: 1, opacity: 0.9 },
        whileHover: { scale: 1.1, opacity: 1 },
        transition: { duration: 0.4, ease: "easeOut" }
    };

    const handleAddToCart = (products) => {
        addToCart(products);
        setAddedProduct(products);
        setShowModal(true);
    };

    return (

        <div className="bg-white ">
            {/* Cart Modal */}
            {showModal && (
                <CartModal
                    product={addedProduct}
                    onClose={() => setShowModal(false)}
                />
            )}

            <Nav_bar />

            {/* HERO */}
            <section className="relative">
                <img src={images.shopss[0]} alt="" className="w-full h-95 object-cover" />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
                    <h1 className="text-white text-5xl font-bold tracking-widest">
                        FEATURED
                    </h1>
                    <p className="text-white/90 mt-2">Featured Collection 2018</p>
                </div>
            </section>

            {/* CONTENT */}
            <section className="max-w-7xl mx-auto px-4 py-14">
                <div className="flex flex-col lg:flex-row gap-10">

                    {/* SIDEBAR [260px] */}
                    <aside className="w-full lg:w-65 space-y-10 text-sm">
                        {/* Categories */}
                        <div>
                            <h2 className="font-bold mb-4 text-lg">Categories</h2>
                            <ul className="space-y-2 text-gray-600">
                                <li className="cursor-pointer">Best Seller (8 items)</li>
                                <li className="cursor-pointer">Featured (8 items)</li>
                                <li className="cursor-pointer">Men (8 items)</li>
                                <li className="cursor-pointer">Women (8 items)</li>
                            </ul>
                        </div>

                        {/* Color */}
                        <div>
                            <h2 className="font-bold mb-3 text-lg">color</h2>
                            <div className="space-y-2 text-gray-600">
                                {["black", "gray", "red"].map((c) => (
                                    <label key={c} className="flex items-center gap-2">
                                        <input type="checkbox" />
                                        <span className="capitalize">{c}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price */}
                        <div>
                            <h2 className="font-bold mb-3 text-lg">price</h2>
                            <div className="space-y-2 text-gray-600">
                                {["0-20", "20-40", "40-60"].map((p) => (
                                    <label key={p} className="flex items-center gap-2">
                                        <input type="checkbox" />
                                        <span>{p}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Size */}
                        <div>
                            <h2 className="font-bold mb-3 text-lg">size</h2>
                            <div className="space-y-2 text-gray-600">
                                {["L", "M", "S", "XL"].map((s) => (
                                    <label key={s} className="flex items-center gap-2">
                                        <input type="checkbox" />
                                        <span>{s}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Search */}
                        <div>
                            <input
                                placeholder="Search..."
                                className="border border-gray-200 w-full p-3 rounded outline-none"
                            />
                        </div>
                    </aside>

                    {/* MAIN */}
                    <div className="flex-1">
                        {/* TOP BAR */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 text-sm">
                            <div className="flex gap-3">
                                <select className="border border-gray-200 p-2 rounded bg-white">
                                    <option>Alphabetically, A-Z</option>
                                </select>

                                <select className="border border-gray-200 p-2 rounded bg-white">
                                    <option>8</option>
                                </select>
                            </div>

                            <p className="text-gray-500">Showing 1 to 8 of 8 items</p>
                        </div>

                        {/* PRODUCTS */}
                        <div className="flex flex-wrap gap-8">
                            {products.map((p) => (
                                <div
                                    
                                     key={p.id}
                                    onMouseEnter={() => setHoveredId(p.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    className="w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]"
                                >
                                    <div

                                        className="relative bg-gray-100 overflow-hidden">
                                        {p.sale && (
                                            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full z-10">
                                                Sale
                                            </span>
                                        )}


                                        <motion.img
                                            {...animation}
                                            src={p.img}
                                            alt=""
                                            className="w-full h-95 object-cover"
                                        />

                                        <button
                                            onClick={() => handleAddToCart(p)}
                                            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:bg-gray-800"
                                            style={{
                                                opacity: hoveredId === p.id ? 1 : 0,
                                                transform: hoveredId === p.id
                                                    ? 'translateX(-50%) translateY(0)'
                                                    : 'translateX(-50%) translateY(20px)'
                                            }}
                                        >
                                            ADD TO CART
                                        </button>
                                    </div>

                                    <h3 className="mt-4 text-sm font-medium text-gray-800">
                                        {p.title}
                                    </h3>
                                    <div className="mt-1 text-sm">
                                        {p.sale ? (
                                            <div className="flex gap-2 items-center">
                                                <span className="line-through text-gray-400">
                                                    {p.oldPrice}
                                                </span>
                                                <span className="text-red-500 font-semibold">
                                                    {p.price}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-gray-600">{p.price}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* PAGINATION */}
                        <div className="flex gap-3 mt-12">
                            <button className="w-10 h-10 rounded-full border bg-black text-white">
                                1
                            </button>
                            <button className="w-10 h-10 rounded-full border">2</button>
                            <button className="w-10 h-10 rounded-full border">&gt;</button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Shop;