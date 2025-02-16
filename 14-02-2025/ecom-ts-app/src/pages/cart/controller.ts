import '@styles/globals.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'
// @ts-ignore-next-line
import * as bootstrap from 'bootstrap'
import navbar from '@components/navbar'
import { auth } from '@pages/login/model'
import { cart } from './model'
import cartsView from './views/carts'
import toast from '@components/toast'

const init = async () => {
  const user = auth.get().user
  if (!user) return (window.location.href = '/login/')

  navbar.render(user)
  navbar.logoutHandler(auth.logout)

  cartsView.render(cart.get().items)

  cartsView.quantityHandler((productId, quantity) => {
    cart.updateQuantity(parseInt(productId), quantity)
    cartsView.renderOrderSummary(cart.get().items)
  })

  cartsView.removeItemHandler(productId => {
    cart.removeItem(parseInt(productId))
    if (cart.get().items.length === 0) cartsView.render([])
    else cartsView.renderOrderSummary(cart.get().items)
  })

  cartsView.placeOrderHandler(() => {
    cart.clearCart()
    toast.success('Order placed successfully!')
    cartsView.render([])
  })
}

init()
