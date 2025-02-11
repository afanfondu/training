// ## Vehicle Rental System
//
// Create Vehicle class with brand, model, rentPricePerDay.
// Subclasses: Car, Bike, Truck.
// Polymorphism: Implement calculateRentalCost(days).

abstract class Vehicle {
  brand: string;
  model: string;
  rentPricePerDay: number;

  constructor(brand: string, model: string, rentPricePerDay: number) {
    this.brand = brand;
    this.model = model;
    this.rentPricePerDay = rentPricePerDay;
  }

  abstract calculateRentalCost(days: number): number;
}

class Car extends Vehicle {
  calculateRentalCost(days: number): number {
    return this.rentPricePerDay * days * 1.2; // 20% extra for car
  }
}
class Bike extends Vehicle {
  calculateRentalCost(days: number): number {
    return this.rentPricePerDay * days * 1.15; // 15% extra for bike
  }
}
class Truck extends Vehicle {
  calculateRentalCost(days: number): number {
    return this.rentPricePerDay * days * 1.1; // 10% extra for truck
  }
}

const car = new Car("Toyota", "Corolla", 5000);
console.log(car.calculateRentalCost(3)); // 18000

const bike = new Bike("Honda", "CBR", 1000);
console.log(bike.calculateRentalCost(3)); // 3449.99

const truck = new Truck("Volvo", "FH16", 3000);
console.log(truck.calculateRentalCost(3)); // 9900
