import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "./pages/AuthContext";
import { CartProvider } from "./components/cartProvider/CartProvider"

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <StrictMode>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>

    </StrictMode>
  </AuthProvider>,
)
