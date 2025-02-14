import { Expense } from "../model";
import View from "./view";

class ExpenseList extends View<Expense[]> {
  container = document.querySelector("#expense-filters")!;

  generateMarkup(): string {
    const expenses = this.data;
    if (!expenses || !expenses.length) return "";

    return `
      <div class="table-responsive">
        <table class="table table-dark table-hover">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${expenses.map((expense) => this.generateTableRow(expense)).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  generateTableRow(expense: Expense) {
    return `
      <tr data-id=${expense.id}>
        <td>${new Date(expense.date).toLocaleDateString()}</td>
        <td>${expense.category}</td>
        <td>${expense.description}</td>
        <td>${expense.amount}</td>
        <td>
          <button class="btn btn-sm btn-danger delete-expense">Delete</button>
        </td>
      </tr>
    `;
  }

  addNewExpense(expense: Expense) {
    const tableBody = this.container.querySelector("tbody")!;
    tableBody.insertAdjacentHTML("beforeend", this.generateTableRow(expense));
  }

  deleteExpenseHandler(handler: (id: string) => void) {
    this.container.querySelector("tbody")!.addEventListener("click", (e) => {
      const deleteBtn = e.target as HTMLButtonElement;
      if (!deleteBtn.classList.contains("delete-expense")) return;

      const deleteConfirm = confirm(
        "Are you sure you want to delete this expense?",
      );
      if (!deleteConfirm) return;

      const tableRow = deleteBtn.closest("tr")!;
      handler(tableRow.dataset.id!);
      tableRow.remove();
    });
  }
}

export default ExpenseList;
