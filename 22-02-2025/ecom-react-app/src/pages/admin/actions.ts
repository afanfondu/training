import api from '@/lib/api'
import { ProductAddForm } from './schema'

export const deleteProduct = async (productId: string) => {
  const { data } = await api.delete(`/products/${productId}`)
  return data
}

export const addProduct = async (product: ProductAddForm) => {
  const { data } = await api.post('/products', product)
  return data
}
