import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './contexts/theme-context'
import { AuthProvider } from './contexts/auth-context/index.tsx'
import { Toaster } from './components/ui/sonner.tsx'
import { ProductProivder } from './contexts/product-context/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <ProductProivder>
          <App />
          <Toaster position="bottom-center" richColors />
        </ProductProivder>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
)
