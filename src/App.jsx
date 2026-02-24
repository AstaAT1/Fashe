import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import Home from "./pages/Home";
import Signin from "./components/signup/signin";
import Signup from "./components/signup/signup";
import Forgotpasswor from "./components/signup/Forgotpasswor";
import Contact from "./pages/contact";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Homeshop from "./components/Homeshop/Homeshop";
import Details from "./pages/details";
import Cart from "./pages/Cart";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Forgotpasswor" element={<Forgotpasswor />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/About" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/Homeshop" element={<Homeshop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/Details/:id" element={<Details />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
