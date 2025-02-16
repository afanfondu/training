import api, { APIResponse } from '@lib/api'
import config from '@lib/config'
import createStore from '@lib/create-store'

export enum Category {
  Electronics = 'electronics',
  Jwelery = 'jewelery',
  MenClothing = "men's clothing",
  WomenClothing = "women's clothing"
}

type Rating = { rate: number; count: number }

export type Product = {
  id: number
  title: string
  price: number
  description: string
  category: Category
  image: string
  rating: Rating
}

export type ProductState = {
  products: Product[]
  currentPage: number
  limit: number
  totalPages: number
  category: Category | null
}

type ProductActions = {
  fetchProducts: () => Promise<APIResponse<Product[]>>
  getProductById: (id: number) => Product | undefined
  setPage: (currentPage: number) => void
  setCategory: (category: Category) => void
}

export const products = createStore<ProductState, ProductActions>(
  (set, get) => ({
    _state: {
      products: [],
      currentPage: 1,
      limit: config.paginationLimit,
      totalPages: 0,
      category: null
    },

    async fetchProducts() {
      const { currentPage, limit, category } = get()
      const endpoint = category ? `/products/category/${category}` : '/products'

      const res = (await api.get(endpoint)) as APIResponse<Product[]>
      if (!res.isError && res.data) {
        const start = (currentPage - 1) * limit
        const end = start + limit
        const paginatedProducts = res.data.slice(start, end)
        const totalPages = Math.ceil(res.data.length / limit)

        set({ products: paginatedProducts, totalPages })
      }

      return res
    },

    getProductById(id) {
      return get().products.find(product => product.id === id)
    },

    setPage(currentPage) {
      set({ currentPage })
    },

    setCategory(category) {
      set({ category, currentPage: 1 })
    }
  })
)
