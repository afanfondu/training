import View from '@components/view'
import toast from '@components/toast'
import { Item } from '../model'

const MAX_QUANTITY = 10

class CartView extends View<Item[]> {
  container = document.querySelector('#container') as HTMLDivElement

  generateMarkup() {
    const items = this.data

    return `
      <div class="container mt-5">
        <h2 class="mb-4">Shopping Cart</h2>
        ${
          !items || items.length === 0
            ? this.generateEmptyCart()
            : `
                <div class="row">
                  <div class="col-lg-8">
                    ${items.map(item => this.generateCartItem(item)).join('')}
                  </div>
                  <div id="order-summary" class="col-lg-4">
                    ${this.generateOrderSummary(items)}
                  </div>
                </div>
              `
        }
      </div>
    `
  }

  private generateEmptyCart() {
    return `
      <div class="text-center py-5">
        <i class="bi bi-cart-x display-1 text-muted mb-4"></i>
        <h3 class="text-muted">Your cart is empty</h3>
        <a href="/" class="btn btn-primary mt-3">Continue Shopping</a>
      </div>
    `
  }

  private generateCartItem(item: Item) {
    return `
      <div class="card mb-3 shadow-sm cart-item" data-product-id="${item.id}">
        <div class="card-body">
          <div class="row align-items-center">
            <div class="col-md-2">
              <img src="${item.image}" class="img-fluid rounded" alt="${
                item.title
              }">
            </div>
            <div class="col-md-5">
              <h5 class="card-title mb-2">${item.title}</h5>
              <p class="card-text text-muted mb-0">$${item.price}</p>
            </div>
            <div class="col-md-3">
              <div class="input-group">
                <button class="btn btn-outline-secondary quantity-btn" type="button" data-action="decrease">-</button>
                <input type="number" class="form-control text-center quantity-input" value="${
                  item.quantity
                }" min="1" max="${MAX_QUANTITY}">
                <button class="btn btn-outline-secondary quantity-btn" type="button" data-action="increase">+</button>
              </div>
            </div>
            <div class="col-md-2 text-end ">
              <button class="btn btn-link text-danger remove-button" type="button">
                <i class="bi bi-trash remove-button"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `
  }

  private generateOrderSummary(items: Item[]) {
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )

    return `
      <div class="card shadow-sm">
        <div class="card-body">
          <h5 class="card-title mb-4">Order Summary</h5>
          <div class="d-flex justify-content-between mb-3">
            <span>Subtotal</span>
            <span>$${total.toFixed(2)}</span>
          </div>
          <div class="d-flex justify-content-between mb-3">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <hr>
          <div class="d-flex justify-content-between mb-4">
            <strong>Total</strong>
            <strong>$${total.toFixed(2)}</strong>
          </div>
          <button class="btn btn-primary w-100 place-order-button">Place Order</button>
        </div>
      </div>
    `
  }

  renderOrderSummary(items: Item[]) {
    if (items.length === 0) return

    this.container.querySelector('#order-summary')!.innerHTML =
      this.generateOrderSummary(items)
  }

  quantityHandler(handler: (productId: string, quantity: number) => void) {
    this.container.addEventListener('click', async e => {
      const quantityBtn = (e.target as Element).closest(
        '.quantity-btn'
      ) as HTMLButtonElement
      if (!quantityBtn || !quantityBtn.classList.contains('quantity-btn'))
        return

      const productId = (quantityBtn.closest('.cart-item') as HTMLDivElement)
        .dataset.productId!
      const input = quantityBtn.parentElement!.querySelector(
        '.quantity-input'
      ) as HTMLInputElement
      let quantity = parseInt(input.value)

      if (quantityBtn.dataset.action === 'increase') {
        if (quantity === MAX_QUANTITY)
          return toast.error('Maximum quantity reached!')
        quantity += 1
      } else {
        if (quantity === 1)
          return toast.error(
            'Click on delete icon, if you want to remove this item'
          )
        quantity -= 1
      }

      input.value = String(quantity)
      handler(productId, quantity)
    })

    this.container.addEventListener('change', async e => {
      const quantityInput = (e.target as Element).closest(
        '.quantity-input'
      ) as HTMLInputElement
      if (!quantityInput || !quantityInput.classList.contains('quantity-btn'))
        return

      const productId = (quantityInput.closest('.cart-item') as HTMLDivElement)
        .dataset.productId!
      let quantity = Math.min(parseInt(quantityInput.value), MAX_QUANTITY)
      quantity = Math.max(quantity, 1)
      quantityInput.value = String(quantity)

      handler(productId, quantity)
    })
  }

  removeItemHandler(handler: (productId: string) => void) {
    this.container.addEventListener('click', async e => {
      const removeBtn = (e.target as Element).closest(
        '.remove-button'
      ) as HTMLButtonElement
      if (!removeBtn || !removeBtn.classList.contains('remove-button')) return

      const item = removeBtn.closest('.cart-item') as HTMLDivElement
      item.remove()
      handler(item.dataset.productId!)
    })
  }

  placeOrderHandler(handler: () => void) {
    this.container.addEventListener('click', async e => {
      if (!(e.target as Element).classList.contains('place-order-button'))
        return

      handler()
    })
  }
}

export default new CartView()
