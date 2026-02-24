import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Nav_bar from "../Nav_bar/Nav_bar";
import { useState, useContext } from "react";
import { AuthContext } from "../../pages/AuthContext";
import PageWrapper from "../ui/PageWrapper";
import Container from "../ui/Container";
import Section from "../ui/Section";
import ScrollReveal from "../ui/ScrollReveal";

function Signup() {
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handlname = name?.length >= 4;
    const handlstname = lastname?.length >= 4;
    const hasAtandDot = email?.includes('@') && email?.includes('.');
    const passwordlenght = password?.length >= 8;
    const passwordsympol = /[^a-zA-Z0-9]/.test(password);

    const { login } = useContext(AuthContext);

    const sign = () => {
        if (hasAtandDot && passwordlenght && passwordsympol && handlstname && handlname) {
            alert("Sign Up Successful ");
            login({ name, lastname, email, password });
            setEmail("");
            setName("");
            setLastname("");
            setPassword("");
        } else {
            let msg = "Fix the following errors:\n";
            if (!handlname) msg += "- First name must be at least 4 characters\n";
            if (!handlstname) msg += "- Last name must be at least 4 characters\n";
            if (!hasAtandDot) msg += "- Email is invalid\n";
            if (!passwordlenght) msg += "- Password must be at least 8 characters\n";
            if (!passwordsympol) msg += "- Password must contain at least one symbol\n";
            alert(msg);
        }
    };

    return (
        <PageWrapper>
            <Nav_bar />

            <Section>
                <Container className="max-w-2xl">
                    <ScrollReveal>
                        <nav className="mb-8 text-sm text-[var(--color-text-muted)]">
                            <Link to="/" className="hover:text-[var(--color-text-primary)] transition-colors">Home</Link>
                            <span className="mx-2">›</span>
                            <span className="text-[var(--color-text-primary)]">Create Account</span>
                        </nav>
                    </ScrollReveal>

                    <ScrollReveal delay={0.05}>
                        <div className="border border-[var(--color-border)] rounded-[var(--radius-xl)] p-6 md:p-10">
                            <h1 className="heading-1 mb-2">Create Account</h1>
                            <p className="text-small mb-8">Your Personal Details</p>

                            <div className="space-y-4">
                                <div>
                                    <label className="label">First Name</label>
                                    <input value={name} onChange={(e) => setName(e.target.value)} className="input" type="text" placeholder="First name" />
                                </div>
                                <div>
                                    <label className="label">Last Name</label>
                                    <input value={lastname} onChange={(e) => setLastname(e.target.value)} className="input" type="text" placeholder="Last name" />
                                </div>
                                <div>
                                    <label className="label">Email</label>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} className="input" type="email" placeholder="your@email.com" />
                                </div>
                                <div>
                                    <label className="label">Password</label>
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} className="input" type="password" placeholder="Min 8 chars, 1 symbol" />
                                </div>
                                <div className="flex items-center gap-4 pt-2">
                                    <button onClick={sign} className="btn btn-primary">Create Account</button>
                                    <span className="text-small">or</span>
                                    <Link to="/" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors">Return to Store</Link>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </Container>
            </Section>

            <Footer />
        </PageWrapper>
    );
}

export default Signup;