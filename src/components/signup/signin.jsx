import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Nav_bar from "../Nav_bar/Nav_bar";
import { IoChevronForwardSharp } from "react-icons/io5";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../pages/AuthContext";

function Signin() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const inpemail = (e) => {
        setEmail(e.target.value)
    }

    const inppassword = (e) => {
        setPassword(e.target.value)
    }
    const { user } = useContext(AuthContext);
    // const { login } = useContext(AuthContext);


    const signin = () => {

        if (!user) {
            alert("No account found. Please sign up first.");
            return;
        }

        if (email === user.email && password === user.password) {
            alert("Login successful ");
            setPassword("")
            setEmail("")
        } else {
            alert("Email or password incorrect ");
        }
    };


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
                        <label htmlFor="">Email</label>
                        <input value={email} onChange={inpemail} className="p-2 border" type="email" placeholder="Email" />
                        <label htmlFor="">Password</label>
                        <input value={password} onChange={inppassword} className="p-2 border" type="password" placeholder="Password" />
                        <Link to={"/Forgotpasswor"}><p className="hover:text-[#e65540]">Forgot your password?</p></Link>
                        <div className="flex gap-5 items-center">
                            <button onClick={signin} className="w-30 h-10 bg-black text-white">SIGN IN </button>
                            <span>or</span>
                            <Link to={"/"} ><p className="hover:text-[#e65540]">Return to Store</p></Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

        </div>
    );
}

export default Signin;