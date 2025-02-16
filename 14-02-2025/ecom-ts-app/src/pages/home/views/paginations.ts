import View from '@components/view'
import { ProductState } from '../model'

class Pagination extends View<ProductState> {
  container = document.querySelector('#container') as HTMLDivElement

  generateMarkup() {
    const { totalPages, currentPage } = this.data!
    return `
      <div class="d-flex justify-content-center">
        <ul class="pagination">
          <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage - 1}">Previous</a>
          </li>
          ${Array.from({ length: totalPages }, (_, i) => i + 1)
            .map(
              page => `
            <li class="page-item ${page === currentPage ? 'active' : ''}">
              <a class="page-link" href="#" data-page="${page}">${page}</a>
            </li>
          `
            )
            .join('')}
          <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage + 1}">Next</a>
          </li>
        </ul>
      </div>
    `
  }

  paginationHandler(handler: (page: number) => Promise<void>) {
    this.container.addEventListener('click', async e => {
      e.preventDefault()

      const pageLink = (e.target as Element).closest(
        '[data-page]'
      ) as HTMLAnchorElement
      if (!pageLink) return

      await handler(parseInt(pageLink.dataset.page!))
    })
  }
}
export default new Pagination()
