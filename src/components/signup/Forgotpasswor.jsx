import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Nav_bar from "../Nav_bar/Nav_bar";
import { IoChevronForwardSharp } from "react-icons/io5";


function Forgotpasswor() {
    return (
        <div>
            <Nav_bar />
            <div className="p-10 flex flex-col gap-y-10">
                <div className="flex gap-2 items-center">
                    <Link to={"/"}><a className="flex items-center hover:text-[#e65540]" href="">Home <IoChevronForwardSharp /></a></Link>

                    <a className="hover:text-[#e65540]" href="">Account</a>
                </div>
                <div className="flex w-full gap-5 pl-32 pr-32  ">
                    <div className="border w-full h-60 p-5 flex flex-col gap-y-10">
                        <div>
                            <h1 className="text-4xl">New Customer</h1>
                            <span className="text-[#aeb3b2]">Register Account</span>
                            <p className="text-[#888888]">By creating an account you will be able to shop faster, be up to date on an order's status, and keep track of the orders you have previously made.</p>
                        </div>
                        <Link to={"/Singup"}><button className="w-30 h-10 bg-black text-white">continue</button></Link>
                    </div>
                    <div className="border w-full h-100 p-10 flex flex-col gap-y-2 ">
                        <h3 className="text-4xl">Returning Customer</h3>
                        <span className="text-[#aeb3b2]">I am a returning customer</span>
                        <h3  className="text-4xl">Reset your password</h3>
                        <span className="text-[#aeb3b2]">We will send you an email to reset your password.</span>
                        
                        <label htmlFor="">Email</label>
                        <input className="p-2 border" type="email" placeholder="Email" />
                        <div className="flex gap-5 items-center">
                            <button className="w-30 h-10 bg-black text-white">SIGN IN </button>
                            <span>or</span>
                            <Link to={"/Signin"} ><p className="hover:text-[#e65540]">cancel</p></Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            
        </div>
    );
}

export default Forgotpasswor;