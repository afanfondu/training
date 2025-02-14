import { Category, Filters } from "../model";
import View from "./view";

class ExpenseFilters extends View<null> {
  container = document.querySelector("#app")!;

  generateMarkup() {
    const categoryOptions = Object.entries(Category)
      .map(([key]) => `<option value="${key}">${key}</option>`)
      .join("");

    return `
      <div id="expense-history" class="card bg-dark border-light mb-4">
        <div class="card-body">
          <h3 class="card-title mb-4">ExpenseHistory</h3>
          <div class="row g-3 mb-5">
            <div class="col-md-4">
              <select id="category" class="form-select bg-dark text-light">
                <option value="">All Categories</option>
                ${categoryOptions}
              </select>
            </div>
            <div class="col-md-4">
              <input
                id="start-date"
                type="date"
                class="form-control bg-dark text-light"
                placeholder="From Date"
              />
            </div>
            <div class="col-md-4">
              <input
                id="end-date"
                type="date"
                class="form-control bg-dark text-light"
                placeholder="To Date"
              />
            </div>
          </div>

          <div id="expense-filters"></div>
        </div>
      </div>
    `;
  }

  filtersChangeHandler(handler: (filters: Filters) => void) {
    this.container
      .querySelector("#expense-history")!
      .addEventListener("change", () => {
        const categoryFilter = document.querySelector(
          "#category",
        ) as HTMLSelectElement;
        const startDate = document.querySelector(
          "#start-date",
        ) as HTMLInputElement;
        const endDate = document.querySelector("#end-date") as HTMLInputElement;

        const filters = {
          category: categoryFilter.value as Category,
          startDate: startDate.value,
          endDate: endDate.value,
        };

        handler(filters);
      });
  }
}

export default new ExpenseFilters();
