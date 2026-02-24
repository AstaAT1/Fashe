import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Nav_bar from "../Nav_bar/Nav_bar";
import { useState, useContext } from "react";
import { AuthContext } from "../../pages/AuthContext";
import PageWrapper from "../ui/PageWrapper";
import Container from "../ui/Container";
import Section from "../ui/Section";
import ScrollReveal from "../ui/ScrollReveal";

function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user } = useContext(AuthContext);

    const signin = () => {
        if (!user) {
            alert("No account found. Please sign up first.");
            return;
        }
        if (email === user.email && password === user.password) {
            alert("Login successful ");
            setPassword("");
            setEmail("");
        } else {
            alert("Email or password incorrect ");
        }
    };

    return (
        <PageWrapper>
            <Nav_bar />

            <Section>
                <Container>
                    {/* Breadcrumb */}
                    <ScrollReveal>
                        <nav className="mb-8 text-sm text-[var(--color-text-muted)]">
                            <Link to="/" className="hover:text-[var(--color-text-primary)] transition-colors">Home</Link>
                            <span className="mx-2">›</span>
                            <span className="text-[var(--color-text-primary)]">Account</span>
                        </nav>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
                        {/* New Customer */}
                        <ScrollReveal>
                            <div className="border border-[var(--color-border)] rounded-[var(--radius-xl)] p-6 md:p-8 h-full flex flex-col">
                                <h2 className="heading-2 mb-2">New Customer</h2>
                                <span className="text-small mb-3">Register Account</span>
                                <p className="text-body text-sm mb-6 flex-1">
                                    By creating an account you will be able to shop faster, be up to date on an order's status, and keep track of the orders you have previously made.
                                </p>
                                <Link to="/Singup">
                                    <button className="btn btn-primary">Continue</button>
                                </Link>
                            </div>
                        </ScrollReveal>

                        {/* Returning Customer */}
                        <ScrollReveal delay={0.1}>
                            <div className="border border-[var(--color-border)] rounded-[var(--radius-xl)] p-6 md:p-8">
                                <h2 className="heading-2 mb-2">Returning Customer</h2>
                                <span className="text-small mb-6 block">I am a returning customer</span>

                                <div className="space-y-4">
                                    <div>
                                        <label className="label">Email</label>
                                        <input value={email} onChange={(e) => setEmail(e.target.value)} className="input" type="email" placeholder="your@email.com" />
                                    </div>
                                    <div>
                                        <label className="label">Password</label>
                                        <input value={password} onChange={(e) => setPassword(e.target.value)} className="input" type="password" placeholder="Password" />
                                    </div>
                                    <Link to="/Forgotpasswor" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-brand)] transition-colors inline-block">
                                        Forgot your password?
                                    </Link>
                                    <div className="flex items-center gap-4 pt-2">
                                        <button onClick={signin} className="btn btn-primary">Sign In</button>
                                        <span className="text-small">or</span>
                                        <Link to="/" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors">Return to Store</Link>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </Container>
            </Section>

            <Footer />
        </PageWrapper>
    );
}

export default Signin;