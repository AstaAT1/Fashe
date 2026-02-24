import Footer from "../components/Footer/Footer";
import Nav_bar from "../components/Nav_bar/Nav_bar";
import { images } from "../constants";
import { motion } from "framer-motion";


function About() {
    const item_cart = {
        backgroundImage: `url(${images.item_cart.item_cart1})`,
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
        <div>
            <Nav_bar />
            <div className="w-full h-60 bg-amber-800 flex justify-center items-center">
                <h1 className="text-6xl font-bold">About</h1>
            </div>
            <div className="w-full  p-10 pl-32 pr-32 grid grid-cols-[35%_1fr] gap-5">
                <motion.div {...animation} className="w-full h-full " style={{
                    ...item_cart, backgroundRepeat: "no-repeat",
                    backgroundPosition: "center"
                }}></motion.div>
                <div className=" w-full h-full p-10">
                    <h1 className="text-3xl font-bold">Our story</h1>
                    <p>Phasellus egestas nisi nisi, lobortis ultricies risus semper nec. Vestibulum pharetra ac ante ut pellentesque. Curabitur fringilla dolor quis lorem accumsan, vitae molestie urna dapibus. Pellentesque porta est ac neque bibendum viverra. Vivamus lobortis magna ut interdum laoreet. Donec gravida lorem elit, quis condimentum ex semper sit amet. Fusce eget ligula magna. Aliquam aliquam imperdiet sodales. Ut fringilla turpis in vehicula vehicula. Pellentesque congue ac orci ut gravida. Aliquam erat volutpat. Donec iaculis lectus a arcu facilisis, eu sodales lectus sagittis. Etiam pellentesque, magna vel dictum rutrum, neque justo eleifend elit, vel tincidunt erat arcu ut sem. Sed rutrum, turpis ut commodo efficitur, quam velit convallis ipsum, et maximus enim ligula ac ligula. Vivamus tristique vulputate ultricies. Sed vitae ultrices orci.</p>
                    <div className="flex gap-5 p-5">
                        <span className="w-0.5 h-35 bg-black"></span>
                        <div className="flex flex-col gap-y-5">
                            <p>Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn't really do it, they just saw something. It seemed obvious to them after a while. </p>
                            <p>- Steve Job's</p>
                        </div>

                    </div>
                </div>

            </div>


            <Footer />

        </div>
    );
}

export default About;