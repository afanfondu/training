import api from '@/lib/api'
import { Product } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'

const fetchCategoryProducts = async (category: string) => {
  const { data } = await api.get(`/products/category/${category}`)
  return data
}

const useCatagoryProducts = (category: string) =>
  useQuery<Product[]>({
    queryKey: ['products', 'catgory', category],
    queryFn: () => fetchCategoryProducts(category)
  })

export default useCatagoryProducts
