export default abstract class View<TData = null> {
  abstract container: Element
  protected data: TData | null = null

  render(data: TData | null = null, append = false) {
    this.data = data

    if (append)
      this.container.insertAdjacentHTML('beforeend', this.generateMarkup())
    else this.container.innerHTML = this.generateMarkup()
  }

  protected abstract generateMarkup(): string

  protected clear() {
    this.container.innerHTML = ''
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="/icons.svg#icon-loader"></use>
        </svg>
      </div>
    `
    this.clear()
    this.container.insertAdjacentHTML('afterbegin', markup)
  }

  renderError(message = 'Something went wrong!') {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="/icons.svg#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `
    this.clear()
    this.container.insertAdjacentHTML('afterbegin', markup)
  }
}
