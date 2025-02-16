import '@styles/globals.scss'
// @ts-ignore-next-line
import * as bootstrap from 'bootstrap'
import navbar from '@components/navbar'
import { auth } from '@pages/login/model'
import productsView from './views/products'
import { products } from './model'
import paginations from './views/paginations'
import toast from '@components/toast'
import { cart } from '@pages/cart/model'

const init = async () => {
  const user = auth.get().user
  navbar.render(user)
  if (user) navbar.logoutHandler(auth.logout)

  await loadProducts()

  paginations.paginationHandler(async page => {
    products.setPage(page)
    await loadProducts()
  })

  productsView.categoryHandler(async category => {
    products.setCategory(category)
    await loadProducts()
  })

  productsView.addToCartHandler(productId => {
    const user = auth.get().user
    if (!user) return toast.error('Please login first.')

    cart.addItem(products.getProductById(parseInt(productId)))
    toast.success('Product added to cart!')
  })
}

const loadProducts = async () => {
  productsView.renderSpinner()
  const { isError } = await products.fetchProducts()
  if (isError) return productsView.renderError()
  productsView.render(products.get().products)

  paginations.render(products.get(), true)
}

init()
