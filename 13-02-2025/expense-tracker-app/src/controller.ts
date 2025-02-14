import "./style.scss";
import expenseForm from "./views/expense-form";
import ExpenseList from "./views/expense-list";
import expenseStore from "./model";
import expenseFilters from "./views/expense-filters";
import toast from "./views/toast";

const init = () => {
  expenseForm.render();
  expenseFilters.render(null, true);
  const expenseList = new ExpenseList();
  expenseList.render(expenseStore.getState().expenses);

  expenseForm.submitHandler((formData) => {
    const result = expenseStore.getState().addExpense(formData);
    if (!result.success) return toast.error(result.error.message);

    if (expenseStore.getState().expenses.length === 1) {
      expenseList.render(expenseStore.getState().expenses);
      expenseList.deleteExpenseHandler((id) => {
        expenseStore.getState().removeExpense(id);
      });
    } else expenseList.addNewExpense(result.data);
  });

  expenseFilters.filtersChangeHandler((filters) => {
    expenseStore.getState().setFilters(filters);
  });

  if (expenseStore.getState().expenses.length !== 0) {
    expenseList.deleteExpenseHandler((id) => {
      expenseStore.getState().removeExpense(id);
    });
  }

  expenseStore.subscribe(
    (state) => state.filters,
    () => {
      const expenses = expenseStore.getState().getFilteredExpenses();
      expenseList.render(expenses);
      expenseList.deleteExpenseHandler((id) => {
        expenseStore.getState().removeExpense(id);
      });
    },
  );
};

init();
