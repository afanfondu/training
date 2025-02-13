interface Employee {
  id: number;
  name: string;
  position: string;
  salary: number;
}

interface Manager extends Employee {
  teamSize: number;
}

class Department {
  private employees: Employee[] = [];

  addEmployee(employee: Employee): void {
    this.employees.push(employee);
  }

  removeEmployee(id: number): void {
    this.employees = this.employees.filter((employee) => employee.id !== id);
  }

  getTotalSalary(): number {
    return this.employees.reduce((sum, employee) => sum + employee.salary, 0);
  }

  listEmployees(): void {
    console.log("Department Employees:");
    this.employees.forEach((emp) => {
      console.log(
        `ID: ${emp.id}, Name: ${emp.name}, Position: ${emp.position}, Salary: ${emp.salary}`,
      );
    });
  }
}

const john: Employee = {
  id: 1,
  name: "John Doe",
  position: "Developer",
  salary: 70000,
};

const jane: Manager = {
  id: 2,
  name: "Jane Smith",
  position: "Team Lead",
  salary: 90000,
  teamSize: 5,
};

const department = new Department();
department.addEmployee(john);
department.addEmployee(jane);
department.listEmployees();
// Department Employees:
// ID: 1, Name: John Doe, Position: Developer, Salary: 70000
// ID: 2, Name: Jane Smith, Position: Team Lead, Salary: 90000

console.log(department.getTotalSalary()); // 160000

department.removeEmployee(jane.id);
department.listEmployees();
// Department Employees:
// ID: 1, Name: John Doe, Position: Developer, Salary: 70000

/**
 * Generic Storage
 */
class GenericStorage<T> {
  private items: T[] = [];

  add(item: T) {
    this.items.push(item);
  }

  remove(item: T) {
    this.items = this.items.filter((storedItem) => storedItem !== item);
  }

  getAll(): T[] {
    return this.items;
  }
}

const employeeStorage = new GenericStorage<Employee>();
employeeStorage.add(john);
employeeStorage.add(jane);
console.log(employeeStorage.getAll());
// [
//   { id: 1, name: 'John Doe', position: 'Developer', salary: 70000 },
//   {
//     id: 2,
//     name: 'Jane Smith',
//     position: 'Team Lead',
//     salary: 90000,
//     teamSize: 5
//   }
// ]

employeeStorage.remove(jane);
console.log(employeeStorage.getAll());
// [ { id: 1, name: 'John Doe', position: 'Developer', salary: 70000 } ]

/**
 * Utility function
 */
const updatedSalary = <T extends Employee>(
  employee: T,
  newSalary: number,
): T => {
  return { ...employee, salary: newSalary };
};

console.log("Updated Employee: ", updatedSalary(john, 80000));
console.log("Updated Manager: ", updatedSalary<Manager>(jane, 95000));
// Updated Employee:  { id: 1, name: 'John Doe', position: 'Developer', salary: 80000 }
// Updated Manager:  {
//   id: 2,
//   name: 'Jane Smith',
//   position: 'Team Lead',
//   salary: 95000,
//   teamSize: 5
// }
