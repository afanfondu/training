// ## Employee Management System
//
// Create Employee class with name, id, #salary.
// Subclasses: Manager, Engineer, Intern.
// Polymorphism: Override calculateBonus() for each role.

class Employee {
  #salary;

  constructor(name, id, salary) {
    this.name = name;
    this.id = id;
    this.#salary = salary;
  }

  getSalary() {
    return this.#salary;
  }

  // should be overwritten
  calculateBonus() {
    return 0;
  }
}

class Manager extends Employee {
  calculateBonus() {
    return this.getSalary() * 0.3;
  }
}
class Engineer extends Employee {
  calculateBonus() {
    return this.getSalary() * 0.2;
  }
}
class Intern extends Employee {
  calculateBonus() {
    return this.getSalary() * 0.1;
  }
}

const manager = new Manager("John", 1, 1000);
console.log(manager.calculateBonus()); // 300

const engineer = new Engineer("Jane", 2, 1000);
console.log(engineer.calculateBonus()); // 200

const intern = new Intern("David", 3, 1000);
console.log(intern.calculateBonus()); // 100
