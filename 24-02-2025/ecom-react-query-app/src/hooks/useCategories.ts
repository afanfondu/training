import api from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

const fetchCategories = async () => {
  const { data } = await api.get('/products/categories')
  return data
}

const useCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  })

export default useCategories
