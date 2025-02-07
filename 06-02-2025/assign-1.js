// Assignment 1: Callback Functions
// Task: Write a function fetchData that simulates fetching data from a server using a callback function.
// The function should take a callback that processes the data after a delay of 2 seconds.
// Use setTimeout to simulate the server delay.
// The data should be an array of user names.
// Implement error handling in the callback function to simulate a case where the server might fail.

function fetchData(callback) {
  setTimeout(() => {
    Math.random() < 0.5
      ? callback(null, ["John", "Jane", "David"])
      : callback(new Error("Server Error"), null);
  }, 2000);
}

fetchData((err, data) => {
  if (err) return console.error("error: ", err.message);

  console.log("data: ", data);
});

// output:
// data:  [ 'John', 'Jane', 'David' ]
// or
// error:  Server Error
