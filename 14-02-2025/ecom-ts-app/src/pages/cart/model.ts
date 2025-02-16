import createStore from '@lib/create-store'
import { Product } from '@pages/home/model'
import { auth } from '@pages/login/model'

export type Item = {
  quantity: number
  userId: number
} & Product

type CartState = {
  items: Item[]
}

type CartActions = {
  addItem: (product: Product | undefined, quantity?: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  removeItem: (productId: number) => void
  clearCart: () => void
}

export const cart = createStore<CartState, CartActions>(
  (set, get) => ({
    _state: {
      items: []
    },

    addItem(product, quantity = 1) {
      const { user } = auth.get()
      if (!product || !user) return

      const productExists = get().items.find(item => item.id === product.id)
      if (productExists) return

      set({
        items: [...get().items, { ...product, quantity, userId: user.sub }]
      })
    },

    updateQuantity(productId, quantity) {
      const { items } = get()
      const updatedItems = items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
      set({ items: updatedItems })
    },

    removeItem(productId) {
      const { items } = get()
      const updatedItems = items.filter(item => item.id !== productId)
      set({ items: updatedItems })
    },

    clearCart() {
      set({ items: [] })
    }
  }),
  'cart'
)
