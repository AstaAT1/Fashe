import Footer from "../components/Footer/Footer";
import Nav_bar from "../components/Nav_bar/Nav_bar";
import { useState } from "react";
import emailjs from '@emailjs/browser';
import PageWrapper from "../components/ui/PageWrapper";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import ScrollReveal from "../components/ui/ScrollReveal";

function Contact() {
    const [first_name, setFirst_name] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const sendEmail = (e) => {
        e.preventDefault();
        const serviceId = "service_ztanidq";
        const templateId = "template_ja64enc";
        const publikKey = "ntontqzg-N_8DmONH";

        const tempalteParams = {
            first_name,
            email,
            phone,
            message,
        };

        emailjs.send(serviceId, templateId, tempalteParams, publikKey)
            .then(() => alert("Email Sent Successfully"))
            .catch((error) => console.log(error))
            .finally(() => {
                setEmail("");
                setFirst_name("");
                setPhone("");
                setMessage("");
            });
    };

    return (
        <PageWrapper>
            <Nav_bar />

            {/* Hero */}
            <section className="relative h-40 md:h-52 bg-gradient-to-r from-gray-900 to-gray-700 flex items-center justify-center">
                <h1 className="heading-display text-white">Contact</h1>
            </section>

            <Section>
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 lg:gap-12">

                        {/* Map */}
                        <ScrollReveal className="min-h-[350px] md:min-h-[450px] rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-sm)]">
                            <iframe
                                width="100%"
                                height="100%"
                                className="w-full h-full min-h-[350px] md:min-h-[450px]"
                                title="Location"
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5901.408187417011!2d-83.714185!3d42.306179!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883cac2e96faa0eb%3A0xa01144dd61fabe3c!2s2300%20Traverwood%20Dr%2C%20Ann%20Arbor%2C%20MI%2048105!5e0!3m2!1sen!2sus!4v1770835347159!5m2!1sen!2sus"
                            />
                        </ScrollReveal>

                        {/* Form */}
                        <ScrollReveal delay={0.1}>
                            <div className="bg-white rounded-[var(--radius-xl)] p-6 md:p-8 shadow-[var(--shadow-md)]">
                                <h2 className="heading-2 mb-6">Send Us a Message</h2>

                                <form onSubmit={sendEmail} className="space-y-4">
                                    <div>
                                        <label className="label">Name</label>
                                        <input
                                            value={first_name}
                                            onChange={(e) => setFirst_name(e.target.value)}
                                            type="text"
                                            className="input"
                                            placeholder="Your name"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="contact-email" className="label">Email</label>
                                        <input
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            type="email"
                                            id="contact-email"
                                            className="input"
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="contact-phone" className="label">Phone</label>
                                        <input
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            type="text"
                                            id="contact-phone"
                                            className="input"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>

                                    <div>
                                        <label className="label">Message</label>
                                        <textarea
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            className="input"
                                            placeholder="How can we help?"
                                            rows="5"
                                            style={{ resize: 'vertical', minHeight: '120px' }}
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary w-full mt-2">
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </ScrollReveal>
                    </div>
                </Container>
            </Section>

            <Footer />
        </PageWrapper>
    );
}

export default Contact;
