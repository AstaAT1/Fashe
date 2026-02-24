import Footer from "../components/Footer/Footer";
import Nav_bar from "../components/Nav_bar/Nav_bar";
import { Link } from "react-router-dom";
import 'flowbite';
import { motion } from "framer-motion";



import { images } from "../constants";
import ProductCarousel from "../components/carousel/productcarousel";

function Home() {




    const back = {
        backgroundImage: `url(${images.banner.banner8})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
    }

    const back1 = {
        backgroundImage: `url(${images.cart.card1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
    }
    const back2 = {
        backgroundImage: `url(${images.cart.card2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
    }
    const back3 = {
        backgroundImage: `url(${images.cart.card3})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
    }
    const back4 = {
        backgroundImage: `url(${images.cart.card4})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
    }
    const back5 = {
        backgroundImage: `url(${images.cart.card5})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
    }
    const back6 = {
        backgroundImage: `url(${images.cart.card6})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
    }

    const glases = {
        backgroundImage: `url(${images.shops.shop})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
    }

    const blog1 = {
        backgroundImage: `url(${images.blog.blog1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
    }
    const blog2 = {
        backgroundImage: `url(${images.blog.blog2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
    }
    const blog3 = {
        backgroundImage: `url(${images.blog.blog3})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
    }






    const animation = {
        initial: { backgroundSize: "100% 100%" },
        animate: { backgroundSize: "100% 100%" },
        whileHover: { backgroundSize: "110% 110%" },
        transition: { duration: 0.4, ease: "easeOut" }
    };


    return (
        <div >
            <Nav_bar />
            {/* carousel section */}
            <div id="animation-carousel" className="relative w-full" data-carousel="static">
                {/* Carousel wrapper */}
                <div className="relative h-56 overflow-hidden rounded-base md:h-96">

                    {/* Item 1 */}
                    <div className="hidden duration-200 ease-linear" data-carousel-item>
                        <img
                            src={images.carousel.carousel1}
                            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            alt="carousel-1"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center z-10">
                            <p className="text-sm md:text-base font-light tracking-wider mb-4">
                                Women Collection 2018
                            </p>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-wider mb-8">
                                NEW ARRIVALS
                            </h1>
                            <Link to={"/Homeshop"}><button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
                                SHOP NOW
                            </button></Link>
                            
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="hidden duration-200 ease-linear" data-carousel-item>
                        <img
                            src={images.carousel.carousel2}
                            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            alt="carousel-2"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center z-10">
                            <p className="text-sm md:text-base font-light tracking-wider mb-4">
                                Women Collection 2018
                            </p>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-wider mb-8">
                                NEW ARRIVALS
                            </h1>
                            <Link to={"/Homeshop"}><button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
                                SHOP NOW
                            </button></Link>
                            
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className="hidden duration-200 ease-linear" data-carousel-item="active">
                        <img
                            src={images.carousel.carousel3}
                            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            alt="carousel-3"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center z-10">
                            <p className="text-sm md:text-base font-light tracking-wider mb-4">
                                Women Collection 2018
                            </p>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-wider mb-8">
                                NEW ARRIVALS
                            </h1>
                            <Link to={"/Homeshop"}><button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
                                SHOP NOW
                            </button></Link>
                            
                        </div>
                    </div>

                </div>

                {/* Previous Button */}
                <button
                    type="button"
                    className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    data-carousel-prev
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-base bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg
                            className="w-5 h-5 text-white rtl:rotate-180"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m15 19-7-7 7-7"
                            />
                        </svg>
                        <span className="sr-only">Previous</span>
                    </span>
                </button>

                {/* Next Button */}
                <button
                    type="button"
                    className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    data-carousel-next
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-base bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg
                            className="w-5 h-5 text-white rtl:rotate-180"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m9 5 7 7-7 7"
                            />
                        </svg>
                        <span className="sr-only">Next</span>
                    </span>
                </button>
            </div>

            {/* section 2  */}

            <section className="container mx-auto p-10 pt-3">
                <div className="w-full h-200 flex gap-2">

                    {/* Column 1 */}
                    <div className="w-1/3 h-full flex flex-col gap-3">

                        <div className="w-full h-[60%]">
                            <motion.div {...animation} className="flex items-center justify-center h-full w-full relative" style={{
                                ...back1, backgroundRepeat: "no-repeat",
                                backgroundPosition: "center"
                            }}>

                                <Link to={"/Shop"}><button className="bg-white w-40 h-12 text-lg cursor-pointer hover:text-white hover:bg-red-500 absolute bottom-10 left-1/2 -translate-x-1/2">
                                    Dresses
                                </button></Link>
                            </motion.div>
                        </div>

                        <div className="w-full h-[40%]">
                            <motion.div {...animation} className="flex items-center justify-center h-full w-full relative" style={{
                                ...back4, backgroundRepeat: "no-repeat",
                                backgroundPosition: "center"
                            }}>
                                <Link to={"/Shop"}><button className="bg-white w-40 h-12 text-lg cursor-pointer hover:text-white hover:bg-red-500 absolute bottom-6 left-1/2 -translate-x-1/2">
                                    Sunglasses
                                </button></Link>
                                
                            </motion.div>
                        </div>

                    </div>

                    {/* Column 2 */}
                    <div className="w-1/3 h-full flex flex-col gap-3">

                        <div className="w-full h-[40%]">
                            <motion.div {...animation} className="flex items-center justify-center h-full w-full relative" style={{
                                ...back2, backgroundRepeat: "no-repeat",
                                backgroundPosition: "center"
                            }}>
                                <Link to={"/Shop"}><button className="bg-white w-40 h-12 text-lg cursor-pointer hover:text-white hover:bg-red-500 absolute bottom-6 left-1/2 -translate-x-1/2" >
                                    Watches
                                </button></Link>
                                
                            </motion.div>
                        </div>

                        <div className="w-full h-[60%]">
                            <motion.div {...animation} className="flex items-center justify-center h-full w-full relative" style={{
                                ...back5, backgroundRepeat: "no-repeat",
                                backgroundPosition: "center"
                            }}>
                                <Link to={"/Shop"}><button className="bg-white w-40 h-12 text-lg cursor-pointer hover:text-white hover:bg-red-500 absolute bottom-10 left-1/2 -translate-x-1/2" >
                                    Footwear
                                </button></Link>
                                
                            </motion.div>
                        </div>

                    </div>

                    {/* Column 3 */}
                    <div className="w-1/3 h-full flex flex-col gap-3">

                        <div className="w-full h-[60%]">
                            <motion.div {...animation} className="flex items-center justify-center h-full w-full relative" style={{
                                ...back3, backgroundRepeat: "no-repeat",
                                backgroundPosition: "center"
                            }}>
                                    <Link to={"Shop"}> <button className="bg-white w-40 h-12 text-lg cursor-pointer hover:text-white hover:bg-red-500 absolute bottom-10 left-1/2 -translate-x-1/2" >
                                    Bags
                                </button></Link>
                                
                            </motion.div>
                        </div>

                        <div className="w-full h-[40%]">
                            <motion.div {...animation} className="flex items-center justify-center h-full w-full relative" style={{
                                ...back6, backgroundRepeat: "no-repeat",
                                backgroundPosition: "center"
                            }}>
                                <Link to={"/Shop"}><button className="bg-white w-40 h-12 text-lg cursor-pointer hover:text-white hover:bg-red-500 absolute bottom-6 left-1/2 -translate-x-1/2" >
                                    Accessories
                                </button></Link>
                                
                            </motion.div>
                        </div>

                    </div>

                </div>
            </section>

            <ProductCarousel />


            {/* section 4 */}
            <motion.section className=" w-full  bg-[#f2f2f2] p-10 pl-35 pr-35 flex gap-5  ">

                <motion.div {...animation} className="w-full h-120  text-white flex flex-col items-center justify-center gap-y-5 " style={{
                    ...back, backgroundRepeat: "no-repeat",
                    backgroundPosition: "center"
                }}>
                    <div className="flex flex-col items-center justify-center ">
                        <h1 className="text-4xl ">The Beauty</h1>
                        <p className="text-7xl">Lookbook</p>
                    </div>
                    <Link><a className="hover:border-b-2 " href="">View Collection</a></Link>
                </motion.div>

                <motion.div {...animation} className="w-full h-120 flex flex-col justify-end items-center gap-y-5 p-10  " style={{
                    ...glases, backgroundRepeat: "no-repeat",
                    backgroundPosition: "center"
                }} >
                    <Link><p>Boxy2 T-Shirt with Roll Sleeve</p></Link>
                    <p>Rs.5,577.73</p>
                    <div className="flex gap-5">
                        <div className="w-20 h-20 border flex flex-col justify-center items-center">
                            <p>-2600</p>
                            <p>days</p>
                        </div>
                        <div className="w-20 h-20 border flex flex-col justify-center items-center">
                            <p>-13</p>
                            <p>hrs</p>
                        </div>
                        <div className="w-20 h-20 border flex flex-col justify-center items-center">
                            <p>-4</p>
                            <p>mins</p>
                        </div>
                        <div className="w-20 h-20 border flex flex-col justify-center items-center">
                            <p>-56</p>
                            <p>secs</p>
                        </div>

                    </div>
                </motion.div>

            </motion.section>

            {/* section 5 */}

            <section className="flex flex-col items-center gap-y-20 p-10">
                <h1 className="text-3xl font-bold">Our Blog</h1>
                <div className="w-full grid grid-cols-3 gap-10  pl-32 pr-32 ">
                    <div className="flex flex-col gap-y-10  h-130  ">
                        <motion.div {...animation} className="h-60" style={{ ...blog1 }}></motion.div>
                        <div className="flex flex-col gap-y-5">
                            <Link><h1 className="text-2xl font-bold hover:text-[#e65540]">Black Friday Guide: Best Sales & Discount Codes</h1></Link>
                            <span>by fashe-theme Admin on Dec 28,2017</span>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed turpis sed lorem dignissim vulputate nec cursus ante. Nunc sit...</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-10  h-130 ">
                        <motion.div {...animation} className="h-60" style={{ ...blog2 }}></motion.div>
                        <div className="flex flex-col gap-y-5">
                            <Link><h1 className="text-2xl font-bold hover:text-[#e65540]">Black Friday Guide: Best Sales & Discount Codes</h1></Link>
                            <span>by fashe-theme Admin on Dec 28,2017</span>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed turpis sed lorem dignissim vulputate nec cursus ante. Nunc sit...</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-10  h-130 ">
                        <motion.div {...animation} className="h-60" style={{ ...blog3 }}></motion.div>
                        <div className="flex flex-col gap-y-5">
                            <Link><h1 className="text-2xl font-bold hover:text-[#e65540]">Black Friday Guide: Best Sales & Discount Codes</h1></Link>
                            <span>by fashe-theme Admin on Dec 28,2017</span>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed turpis sed lorem dignissim vulputate nec cursus ante. Nunc sit...</p>
                        </div>
                    </div>
                </div>

            </section>

            {/* section6 */}

            <section className="flex flex-col items-center gap-y-25 p-10">
                <h1 className="text-4xl font-bold">@ FOLLOW US ON INSTAGRAM</h1>
                <div className="w-full h-30 flex gap-5">
                    <div className="w-full h-30 flex flex-col justify-center items-center border-r-2">
                        <h3>Free Delivery Worldwide</h3>
                        <p>Mirum est notare quam littera gothica</p>
                    </div>
                    <div className="w-full h-30 flex flex-col justify-center items-center border-r-2 ">
                        <h3>Free Delivery Worldwide</h3>
                        <p>Mirum est notare quam littera gothica</p>
                    </div>
                    <div className="w-full h-30 flex flex-col justify-center items-center ">
                        <h3>Free Delivery Worldwide</h3>
                        <p>Mirum est notare quam littera gothica</p>
                    </div>

                </div>
            </section>


            <Footer />
        </div>
    );
}

export default Home;