import { Route } from 'react-router'
import { BrowserRouter } from 'react-router'
import { Routes } from 'react-router'
import Navbar from './components/shared/navbar'
import LoginPage from './pages/login'
import HomePage from './pages/home'
import CartPage from './pages/cart'
import AdminPage from './pages/admin'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
