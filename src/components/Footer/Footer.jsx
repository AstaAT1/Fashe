import { FaFacebookF, FaGooglePlusG, FaInstagram, FaPinterest, FaTwitter } from "react-icons/fa";


function Footer() {
    return (
        <div className="w-full h-150 bg-[#f0f0f0] p-20 flex flex-col  gap-y-30   ">
            <div className="flex justify-between ">
                <div className="flex flex-col gap-y-10">
                    <h3 className="text-black font-bold">GET IN TOUCH</h3>
                    <p className="w-120">Any questions? Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018 or call us on (+1) 96 716 6879</p>
                    <div className="flex gap-5">
                        <a className="text-2xl hover:text-[#e65540]" href="">{<FaFacebookF />}</a>
                        <a className="text-2xl hover:text-[#e65540]" href="">{<FaTwitter />}</a>
                        <a className="text-2xl hover:text-[#e65540]" href="">{<FaPinterest />}</a>
                        <a className="text-2xl hover:text-[#e65540]" href="">{<FaGooglePlusG />}</a>
                        <a className="text-2xl hover:text-[#e65540]" href="">{< FaInstagram />}</a>
                    </div>
                </div>
                <div className="flex flex-col gap-y-10">
                    <h3 className="text-black font-bold">CATEGORIES</h3>
                    <div className="flex flex-col gap-y-5">
                        <a className=" hover:text-[#e65540]" href="">Men</a>
                        <a className=" hover:text-[#e65540]" href="">Women</a>
                        <a className=" hover:text-[#e65540]" href="">Dresses</a>
                        <a className=" hover:text-[#e65540]" href="">Sunglasses</a>
                    </div>
                </div>
                <div className="flex flex-col gap-y-10">
                    <h3 className="text-black font-bold">CATEGORIES</h3>
                    <div className="flex flex-col gap-y-5">
                        <a className=" hover:text-[#e65540]" href="">Search</a>
                        <a className=" hover:text-[#e65540]" href="">About Us</a>
                        <a className=" hover:text-[#e65540]" href="">Contact Us</a>
                        <a className=" hover:text-[#e65540]" href="">Returns</a>
                    </div>
                </div>
                <div className="flex flex-col gap-y-10">
                    <h3 className="text-black font-bold">CATEGORIES</h3>
                    <div className="flex flex-col gap-y-5">
                        <a className=" hover:text-[#e65540]" href="">Track Order</a>
                        <a className=" hover:text-[#e65540]" href="">Returns</a>
                        <a className=" hover:text-[#e65540]" href="">Shipping</a>
                        <a className=" hover:text-[#e65540]" href="">FAQs</a>
                    </div>
                </div>
                <div className="flex flex-col gap-y-10">
                    <h3 className="text-black font-bold">NEWSLETTER</h3>
                    <div className="flex flex-col gap-5">
                        <input className="w-60 border-b-2 p-1" type="text" placeholder="Email Addres" />
                        <button className="w-45 h-13 rounded-full bg-black text-white text-2xl">Subscribe</button>
                    </div>
                </div>
            </div>
            <div className=" flex justify-center ">
                <p>Copyright © 2022 Shopify Theme Developed by MassTechnologist All rights reserved.</p>
            </div>

        </div>
    );
}

export default Footer;