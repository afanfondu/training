const products = [
  { name: "Laptop", price: 80000, category: "Electronics" },
  { name: "Shoes", price: 4000, category: "Fashion" },
  { name: "Phone", price: 40000, category: "Electronics" },
  { name: "T-Shirt", price: 1500, category: "Fashion" },
];

/* Task 1: Use map() to transform data
 * Create an array of product objects with properties name, price, and category.
 * Use map() to create a new array with product names in uppercase.
 */
const newProducts = products.map((product) => ({
  ...product,
  name: product.name.toUpperCase(),
}));
console.log(newProducts);
// [
//   { name: 'LAPTOP', price: 80000, category: 'Electronics' },
//   { name: 'SHOES', price: 4000, category: 'Fashion' },
//   { name: 'PHONE', price: 40000, category: 'Electronics' },
//   { name: 'T-SHIRT', price: 1500, category: 'Fashion' }
// ]

/* Task 2: Use filter() to extract specific data
 * Use filter() to create an array of products that belong to the 'Electronics' category.
 */
const electronics = products.filter(
  (product) => product.category === "Electronics",
);
console.log(electronics);
// [
//   { name: 'Laptop', price: 80000, category: 'Electronics' },
//   { name: 'Phone', price: 40000, category: 'Electronics' }
// ]

/* Task 3: Use reduce() to calculate a total
 * Use reduce() to calculate the total price of all products in the array.
 */
const total = products.reduce((sum, product) => sum + product.price, 0);
console.log(total); // 125500

/* Task 4: Combine map(), filter(), and reduce()
 * Create a function that calculates the total price of products from a specific category using map(), filter(), and reduce().
 */
const electronicsTotal = products
  .filter((product) => product.category === "Electronics")
  .map((product) => product.price)
  .reduce((sum, price) => sum + price, 0);
console.log(electronicsTotal); // 120000;
