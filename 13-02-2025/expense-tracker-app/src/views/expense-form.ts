import View from "./view";
import { Category } from "../model";

class ExpenseForm extends View<null> {
  container = document.querySelector("#app")!;

  generateMarkup(): string {
    const categoryOptions = Object.entries(Category)
      .map(([key]) => `<option value="${key}">${key}</option>`)
      .join("");

    return `
      <h1 class="text-center mb-5">Expense Tracker</h1>
      <div class="card bg-dark border-light mb-4">
        <div class="card-body">
          <h3 class="card-title mb-4">Add New Expense</h3>
          <form>
            <div class="row g-3">
              <div class="col-md-6">
                <input
                  name="amount"
                  type="number"
                  class="form-control bg-dark text-light"
                  placeholder="Amount"
                  required
                />
              </div>
              <div class="col-md-6">
                <select required class="form-select bg-dark text-light" name="category">
                  <option value="">Select Category</option>
                  ${categoryOptions}
                </select>
              </div>
              <div class="col-md-6">
                <input name="date" type="date" class="form-control bg-dark text-light" />
              </div>
              <div class="col-md-6">
                <input
                  name="description"
                  type="text"
                  class="form-control bg-dark text-light"
                  placeholder="Description"
                />
              </div>
              <div class="col-12">
                <button type="submit" class="btn btn-primary">
                  Add Expense
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  submitHandler(handler: (formData: unknown) => void) {
    const form = this.container.querySelector("form")!;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = Object.fromEntries(
        new FormData(e.target as HTMLFormElement),
      ) as unknown;
      handler(formData);
    });
  }
}

export default new ExpenseForm();
