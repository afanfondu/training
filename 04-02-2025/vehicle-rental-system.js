// ## Vehicle Rental System
//
// Create Vehicle class with brand, model, rentPricePerDay.
// Subclasses: Car, Bike, Truck.
// Polymorphism: Implement calculateRentalCost(days).

class Vehicle {
  constructor(brand, model, rentPricePerDay) {
    this.brand = brand;
    this.model = model;
    this.rentPricePerDay = rentPricePerDay;
  }

  calculateRentalCost(days) {
    return this.rentPricePerDay * days;
  }
}

class Car extends Vehicle {
  calculateRentalCost(days) {
    return super.calculateRentalCost(days) * 1.2; // 20% extra for car
  }
}
class Bike extends Vehicle {
  calculateRentalCost(days) {
    return super.calculateRentalCost(days) * 1.15; // 15% extra for car
  }
}
class Truck extends Vehicle {
  calculateRentalCost(days) {
    return super.calculateRentalCost(days) * 1.1; // 10% extra for car
  }
}

const car = new Car("Toyota", "Corolla", 5000);
console.log(car.calculateRentalCost(3));

const bike = new Bike("Honda", "CBR", 1000);
console.log(bike.calculateRentalCost(3));

const truck = new Truck("Volvo", "FH16", 3000);
console.log(truck.calculateRentalCost(3));
