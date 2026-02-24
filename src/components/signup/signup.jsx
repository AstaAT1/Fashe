import { IoChevronForwardSharp } from "react-icons/io5";
import Footer from "../Footer/Footer";
import Nav_bar from "../Nav_bar/Nav_bar";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../pages/AuthContext";


function Signup() {

    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const inpemail = (e) => {
        setEmail(e.target.value)
    }

    const inpname = (e) => {
        setName(e.target.value)
    }

    const inplastname = (e) => {
        setLastname(e.target.value)
    }

    const inppassword = (e) => {
        setPassword(e.target.value)
    }





    const handlname = name?.length >= 4

    const handlstname = lastname?.length >= 4

    const hasAtandDot = email?.includes('@') && email?.includes('.')

    const passwordlenght = password?.length >= 8

    const passwordsympol = /[^a-zA-Z0-9]/.test(password);


    const { login } = useContext(AuthContext);


    const sign = () => {


        if (hasAtandDot && passwordlenght && passwordsympol && handlstname && handlname) {
            alert("Sign Up Successful ");
            setEmail("");
            setName("");
            setLastname("")
            setPassword("");

            login({
                name,
                lastname,
                email,
                password
            });


        } else {
            let msg = "Fix the following errors:\n";
            if (!hasAtandDot) msg += "- Email is invalid\n";
            if (!passwordlenght) msg += "- Password must be at least 8 characters\n";
            if (!passwordsympol) msg += "- Password must contain at least one symbol\n";
            if (!handlname) msg += "your name must be at least 5 characters\n";
            if (!handlstname) msg += "your name must be at least 5 characters\n"
            alert(msg);
        }
    };


    return (
        <div>
            <Nav_bar />
            <div className="p-10 flex flex-col gap-y-10">
                <div className="flex gap-2 items-center">
                    <a className="flex items-center hover:text-[#e65540]" href="">Home <IoChevronForwardSharp /></a>
                    <a className="hover:text-[#e65540]" href="">Create Account</a>
                </div>
                <div className="pl-43 pr-43 ">
                    <div className="w-full   ">
                        <h1 className="text-4xl font-bold">Create Account</h1>
                        <p>Your Personal Details</p>
                        <div className="p-5 flex flex-col gap-y-5">
                            <label htmlFor="">First Name</label>
                            <input value={name} onChange={inpname} className="p-3 border" type="text" placeholder="First Name" />
                            <label htmlFor="">Last Name</label>
                            <input value={lastname} onChange={inplastname} className="p-3 border" type="text" placeholder="Last Name" />
                            <label htmlFor="">Email</label>
                            <input value={email} onChange={inpemail} className="p-3 border" type="email" placeholder="Email" />
                            <label htmlFor="">Password</label>
                            <input value={password} onChange={inppassword} className="p-3 border" type="password" placeholder="Password" />
                            <div className="flex gap-2 items-center">
                                <button onClick={sign} className="w-30 h-10 bg-black text-white">sign in</button>
                                <span >or</span>
                                <Link to={"/"}><p className="hover:text-[#e65540]">Return to Store</p></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />


        </div>
    );
}

export default Signup;