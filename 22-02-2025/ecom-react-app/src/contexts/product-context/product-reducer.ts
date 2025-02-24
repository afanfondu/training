import { Product } from '@/lib/types'

export type ProductState = {
  isLoading: boolean
  products: Product[]
  error?: string
}

export type ProductAction =
  | { type: 'PRODUCTS_FETCH_START' }
  | { type: 'PRODUCTS_FETCH_SUCCESS'; payload: Product[] }
  | { type: 'PRODUCTS_FETCH_ERROR'; payload: string }

export const productReducer = (
  state: ProductState,
  action: ProductAction
): ProductState => {
  switch (action.type) {
    case 'PRODUCTS_FETCH_START':
      return { ...state, isLoading: true }
    case 'PRODUCTS_FETCH_SUCCESS':
      return { products: action.payload, isLoading: false }
    case 'PRODUCTS_FETCH_ERROR':
      return { ...state, error: action.payload, isLoading: false }
  }
}
