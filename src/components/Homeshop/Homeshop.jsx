import Footer from "../Footer/Footer";
import Nav_bar from "../Nav_bar/Nav_bar";
import { images } from "../../constants";
import { Link } from "react-router-dom";


function Homeshop() {
    return (
        <div>
            <Nav_bar />

            <div className="container mx-auto px-4 py-16">
                {/* Breadcrumb */}
                <div className="mb-8">
                    <Link to={"/"}><span className="text-gray-600">Home</span></Link>
                    <span className="mx-2 text-gray-400">›</span>
                    <span className="text-gray-900">Collections</span>
                </div>

                {/* Collections Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Collection 1 */}
                    <div className="group cursor-pointer">
                        <Link to={"/shop"}> <div className="relative overflow-hidden mb-4">
                            <img
                                src={images.shops.shop8}
                                alt="Winter Collection"
                                className="w-full h-150 object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute bottom-8 left-8 text-white">
                                <h3 className="text-3xl font-bold mb-2">Winter</h3>
                                <p className="text-lg">(8 items)</p>
                            </div>
                        </div></Link>
                       
                    </div>

                    {/* Collection 2 */}
                    <div className="group cursor-pointer">
                        <Link to={"/shop"}> <div className="relative overflow-hidden mb-4">
                            <img
                                src={images.shops.shop}
                                alt="Featured Collection"
                                className="w-full h-150 object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute bottom-8 left-8 text-white">
                                <h3 className="text-3xl font-bold mb-2">Featured</h3>
                                <p className="text-lg">(8 items)</p>
                            </div>
                        </div></Link>
                       
                    </div>

                    {/* Collection 3 */}
                    <div className="group cursor-pointer">
                        <Link to={"/shop"}><div className="relative overflow-hidden mb-4">
                            <img
                                src={images.shops.shop8}
                                alt="Summer Collection"
                                className="w-full h-150 object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute bottom-8 left-8 text-white">
                                <h3 className="text-3xl font-bold mb-2">Summer</h3>
                                <p className="text-lg">(8 items)</p>
                            </div>
                        </div></Link>
                        
                    </div>

                </div>
            </div>

            <Footer />

        </div>
    );
}

export default Homeshop;