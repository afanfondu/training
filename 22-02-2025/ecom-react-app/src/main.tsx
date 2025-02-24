import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './contexts/theme-context'
import { AuthProvider } from './contexts/auth-context'
import { Toaster } from './components/ui/sonner.tsx'
import { ProductsProivder } from './contexts/products-context'
import { CartProvider } from './contexts/cart-context'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <ProductsProivder>
          <CartProvider>
            <App />
            <Toaster position="bottom-center" richColors />
          </CartProvider>
        </ProductsProivder>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
)
