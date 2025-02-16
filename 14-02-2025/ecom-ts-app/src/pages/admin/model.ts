import api, { APIResponse } from '@lib/api'
import createStore from '@lib/create-store'
import { Product } from '@pages/home/model'

type State = {
  products: Product[]
}

type Actions = {
  fetchProducts: () => Promise<APIResponse<Product[]>>
  addProduct: (product: Product) => Promise<APIResponse<Product>>
  deleteProduct: (productId: number) => Promise<APIResponse>
}

export const adminProducts = createStore<State, Actions>((set, get) => ({
  _state: {
    products: []
  },

  async fetchProducts() {
    const res = (await api.get('/products')) as APIResponse<Product[]>
    if (!res.isError) {
      set({ products: res.data })
    }

    return res
  },

  async addProduct(product) {
    const res = (await api.post('/products', product)) as APIResponse<Product>
    if (!res.isError && res.data) {
      set({ products: [...get().products, res.data] })
    }

    return res
  },

  async deleteProduct(productId) {
    const res = (await api.delete(`/products/${productId}`)) as APIResponse
    if (!res.isError) {
      const products = get().products.filter(p => p.id !== productId)
      set({ products })
    }

    return res
  }
}))
