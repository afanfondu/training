import { Product } from '@/lib/types'

export type ProductsState = {
  isLoading: boolean
  products: Product[]
  error?: string
}

export type ProductsAction =
  | { type: 'PRODUCTS_FETCH_START' }
  | { type: 'PRODUCTS_FETCH_SUCCESS'; payload: Product[] }
  | { type: 'PRODUCTS_FETCH_ERROR'; payload: string }
  | { type: 'DELETE_PRODUCT'; payload: { productId: number } }
  | { type: 'ADD_PRODUCT'; payload: Product }

export const productsReducer = (
  state: ProductsState,
  action: ProductsAction
): ProductsState => {
  switch (action.type) {
    case 'PRODUCTS_FETCH_START':
      return { ...state, isLoading: true }
    case 'PRODUCTS_FETCH_SUCCESS':
      return { products: action.payload, isLoading: false }
    case 'PRODUCTS_FETCH_ERROR':
      return { ...state, error: action.payload, isLoading: false }
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(
          product => product.id !== action.payload.productId
        )
      }
    case 'ADD_PRODUCT':
      return { ...state, products: [action.payload, ...state.products] }
  }
}
