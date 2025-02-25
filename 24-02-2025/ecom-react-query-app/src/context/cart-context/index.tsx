import { CartItem } from '@/lib/types'
import { createContext, useContext, useEffect, useReducer } from 'react'
import { CartAction, cartReducer } from './cart-reducer'
import config from '@/lib/config'

type CartContextType = {
  cartItems: CartItem[]
  dispatch: React.ActionDispatch<[action: CartAction]>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const STORAGE_KEY = `${config.appName}-cart`

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, dispatch] = useReducer(cartReducer, [], () => {
    const storageValue = localStorage.getItem(STORAGE_KEY)
    return storageValue ? JSON.parse(storageValue) : []
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  return <CartContext value={{ cartItems, dispatch }}>{children}</CartContext>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
