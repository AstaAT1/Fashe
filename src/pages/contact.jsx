import Footer from "../components/Footer/Footer";
import Nav_bar from "../components/Nav_bar/Nav_bar";
import { useState } from "react";
import emailjs from '@emailjs/browser';



function Contact() {
    const [first_name, setFirst_name] = useState("");

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");


    const sendEmail = (e) => {
        e.preventDefault();
        //* get the serviceId, templateId, publickey from your EmailJs  account
        const serviceId = "service_ztanidq";
        const templateId = "template_ja64enc";
        const publikKey = "ntontqzg-N_8DmONH";

        //* creare Template Params Object
        const tempalteParams = {
            first_name: first_name,
            email: email,
            phone: phone,
            message: message,

        }

        //* Send Email Via email js
        emailjs
            .send(serviceId, templateId, tempalteParams, publikKey)
            .then(() => {
                alert("Email Sent Successfully");
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setEmail("");
                setFirst_name("");
                setPhone("")
                setMessage("");

            });

    };





    return (
        <div>
            <Nav_bar />

            <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">

                    {/* MAP SECTION */}
                    <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">

                        <iframe
                            width="100%"
                            height="100%"
                            className="absolute inset-0"
                            title="map"

                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5901.408187417011!2d-83.714185!3d42.306179!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883cac2e96faa0eb%3A0xa01144dd61fabe3c!2s2300%20Traverwood%20Dr%2C%20Ann%20Arbor%2C%20MI%2048105!5e0!3m2!1sen!2sus!4v1770835347159!5m2!1sen!2sus"
                        ></iframe>


                    </div>

                    {/* FORM SECTION */}
                    <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 p-6 rounded-lg shadow-lg">
                        <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
                            Send us your message
                        </h2>

                        <div className="relative mb-4">
                            <label className="leading-7 text-sm text-gray-600">
                                Name
                            </label>
                            <input
                                value={first_name}
                                onChange={(e)=> setFirst_name(e.target.value)}
                                type="text"
                                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>

                        <div className="relative mb-4">
                            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                                Email
                            </label>
                            <input
                            value={email}
                                onChange={(e)=> setEmail(e.target.value)}
                                type="email"
                                id="email"
                                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>

                        <div className="relative mb-4">
                            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
                                Phone
                            </label>
                            <input
                            value={phone}
                                onChange={(e)=> setPhone(e.target.value)}
                                type="text"
                                id="Phone"
                                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>

                        <div className="relative mb-4">
                            <label className="leading-7 text-sm text-gray-600">
                                Message
                            </label>
                            <textarea
                                value={message}
                                onChange={(e)=> setMessage(e.target.value)}
                                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                            ></textarea>
                        </div>

                        <div>
                            <button onClick={sendEmail}
                             className="w-40 h-15 text-white bg-[#222222] rounded-full">

                                Send
                            </button>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Contact;

