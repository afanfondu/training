import api from '@/lib/api'
import { Product } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'

const fetchCategoryProducts = async (category: string | null) => {
  const { data } = await api.get(`/products/category/${category}`)
  return data
}

const useCategoryProducts = (category: string | null) =>
  useQuery<Product[]>({
    queryKey: ['products', 'category', category],
    queryFn: () => fetchCategoryProducts(category)
  })

export default useCategoryProducts
