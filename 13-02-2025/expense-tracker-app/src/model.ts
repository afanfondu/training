import { z } from "zod";
import { createStore } from "zustand/vanilla";
import { persist, subscribeWithSelector } from "zustand/middleware";

export enum Category {
  Food = "Food",
  Travel = "Travel",
  Bills = "Bills",
  Shopping = "Shopping",
}

const expenseSchema = z.object({
  id: z.string().default(() => Date.now().toString()),
  amount: z.coerce.number(),
  category: z.nativeEnum(Category),
  date: z.coerce.date(),
  description: z.string(),
});

export type Expense = z.infer<typeof expenseSchema>;
// export interface Expense {
//   id: string;
//   amount: number;
//   category: Category;
//   date: Date;
//   description: string;
// }

export type Filters = {
  category?: Category;
  startDate?: Date;
  endDate?: Date;
};

type State = {
  expenses: Expense[];
  filters: Filters;
  addExpense: (formData: unknown) => z.SafeParseReturnType<unknown, Expense>;
  removeExpense: (id: string) => void;
  setFilters: (filters: Filters) => void;
  getFilteredExpenses: () => Expense[];
};

const store = createStore<State>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        expenses: [],
        filters: {},

        addExpense: (formData: unknown) => {
          const result = expenseSchema.safeParse(formData);
          if (result.success) {
            set({
              expenses: [...get().expenses, result.data],
            });
          }

          return result;
        },

        removeExpense: (id: string) => {
          const expenses = get().expenses.filter(
            (expense) => expense.id !== id,
          );
          set({ expenses });
        },

        setFilters: (filters: Filters) => {
          set({ filters });
        },

        getFilteredExpenses: () => {
          const { expenses, filters } = get();
          return expenses.filter((expense) => {
            if (filters.category && expense.category !== filters.category) {
              return false;
            }
            if (
              filters.startDate &&
              new Date(expense.date) < filters.startDate
            ) {
              return false;
            }
            if (filters.endDate && new Date(expense.date) > filters.endDate) {
              return false;
            }
            return true;
          });
        },
      }),

      { name: "expenses" },
    ),
  ),
);

export default store;
