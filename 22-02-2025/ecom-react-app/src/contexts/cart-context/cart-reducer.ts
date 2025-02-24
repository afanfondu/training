import { CartItem } from '@/lib/types'

type CartState = CartItem[]

export type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: number } }
  | {
      type: 'UPDATE_QUANTITY'
      payload: { productId: number; updatedQuantity: number }
    }

export const cartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.payload]
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.product.id != action.payload.productId)
    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.product.id === action.payload.productId
          ? { ...item, quantity: action.payload.updatedQuantity }
          : item
      )
  }
}
