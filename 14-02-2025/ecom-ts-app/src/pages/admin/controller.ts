import '@styles/globals.scss'
// @ts-ignore-next-line
import * as bootstrap from 'bootstrap'
import navbar from '@components/navbar'
import { auth } from '@pages/login/model'
import productsTable from './views/products-table'
import { adminProducts } from './model'

const init = async () => {
  const user = auth.get().user
  if (!user || user.user !== 'donero') return (window.location.href = '/')

  navbar.render(user)
  navbar.logoutHandler(auth.logout)

  productsTable.renderSpinner()
  const { isError } = await adminProducts.fetchProducts()
  if (isError) return productsTable.renderError()
  productsTable.render(adminProducts.get().products)

  productsTable.deleteHandler(async productId => {
    return await adminProducts.deleteProduct(Number(productId))
  })

  productsTable.addProductHandler(async productData => {
    return await adminProducts.addProduct(productData)
  })
}

init()
