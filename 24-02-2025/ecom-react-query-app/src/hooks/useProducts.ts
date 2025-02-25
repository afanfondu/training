import api from '@/lib/api'
import { Product } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'

const fetchProducts = async () => {
  const { data } = await api.get('/products')
  return data
}

const useProducts = () =>
  useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts
  })

export default useProducts
