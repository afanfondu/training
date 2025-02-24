import { Product } from '@/lib/types'
import { createContext, useContext, useEffect, useReducer } from 'react'
import { productsReducer, ProductsState } from './products-reducer'
import api from '@/lib/api'
import { AxiosError } from 'axios'

type ProductsContextType = ProductsState

const ProductContext = createContext<ProductsContextType | null>(null)

export function ProductsProivder({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(productsReducer, {
    isLoading: true,
    products: []
  })

  useEffect(() => {
    ;(async () => {
      try {
        dispatch({ type: 'PRODUCTS_FETCH_START' })

        const res = await api.get<Product[]>('/products')
        dispatch({ type: 'PRODUCTS_FETCH_SUCCESS', payload: res.data })
      } catch (error) {
        const errorMessage =
          error instanceof AxiosError
            ? error.response?.data
            : error instanceof Error
              ? error.message
              : 'Something went wrong!'
        dispatch({ type: 'PRODUCTS_FETCH_ERROR', payload: errorMessage })
      }
    })()
  }, [])

  return <ProductContext value={state}>{children}</ProductContext>
}

export function useProducts() {
  const context = useContext(ProductContext)
  if (!context)
    throw new Error('useProducts must be used within a ProductProvider')
  return context
}
