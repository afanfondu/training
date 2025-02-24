import api from '@/lib/api'
import { Product } from '@/lib/types'

export const deleteProduct = async (productId: string) => {
  const { data } = await api.delete(`/products/${productId}`)
  return data
}

export const addProduct = async (product: Product) => {
  const { data } = await api.post('/products', product)
  return data
}
