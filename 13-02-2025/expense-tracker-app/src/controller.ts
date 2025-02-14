import "./style.scss";
import expenseForm from "./views/expense-form";
import ExpenseList from "./views/expense-list";
import expenseStore from "./model";
import expenseFilters from "./views/expense-filters";
import toast from "./views/toast";

const init = () => {
  expenseForm.render();
  expenseForm.submitHandler((formData) => {
    const result = expenseStore.getState().addExpense(formData);
    if (!result.success) return toast.error(result.error.message);

    expenseList.addNewExpense(result.data);
  });

  expenseFilters.render(null, true);

  const expenseList = new ExpenseList();
  expenseList.render(expenseStore.getState().expenses);

  expenseFilters.filtersChangeHandler((filters) => {
    expenseStore.getState().setFilters(filters);
    const expenses = expenseStore.getState().getFilteredExpenses();
    expenseList.render(expenses);
  });

  expenseList.deleteExpenseHandler((id) => {
    expenseStore.getState().removeExpense(id);
  });
};

init();
