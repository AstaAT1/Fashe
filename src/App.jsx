import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Signin from "./components/signup/signin"
import Signup from "./components/signup/signup"
import Forgotpasswor from "./components/signup/Forgotpasswor"
import Contact from "./pages/contact"
import Blog from "./pages/Blog"
import About from "./pages/About"
import Shop from "./pages/Shop"

import Homeshop from "./components/Homeshop/Homeshop"
import Details from "./pages/details"





function App() {


  return (
    <>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signin" element={< Signin />} />
        <Route path="/Singup" element={< Signup />} />
        <Route path="/Forgotpasswor" element={<Forgotpasswor />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/About" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/Homeshop" element={<Homeshop />} />
        <Route path="/Details/:id" element={<Details />} />
        
      </Routes>
      

    </>
  )
}

export default App
