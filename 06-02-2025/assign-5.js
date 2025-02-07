// **Assignment 5: Callback Functions with map(), filter(), and **reduce()
// Task: Create a processData function that accepts an array of numbers and a callback.
// If the callback is filterOdd, filter out even numbers.
// If the callback is doubleNumbers, double each number.
// If the callback is calculateSum, return the sum of all numbers.
// Bonus Task: Implement a callback to find the maximum number in the array.

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const processData = (numbers, callback) => callback(numbers);

const filterOdd = (numbers) => numbers.filter((number) => number % 2 !== 0);
console.log(processData(numbers, filterOdd)); // [ 1, 3, 5, 7, 9 ]

const doubleNumbers = (numbers) => numbers.map((number) => number * 2);
console.log(processData(numbers, doubleNumbers));
// [
//    0,  2,  4,  6,  8,
//   10, 12, 14, 16, 18
// ]

const calculateSum = (numbers) =>
  numbers.reduce((sum, number) => sum + number, 0);
console.log(processData(numbers, calculateSum)); // 45

const calculateMax = (numbers) =>
  numbers.reduce((max, number) => Math.max(max, number), -Infinity);
console.log(processData(numbers, calculateMax)); // 9
