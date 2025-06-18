// ========================
// 🧪 TypeScript HR Lab Starter
// ========================
//
// TODO: 1. Define enum Role
enum Role {
  User = 'USER',
  Employee = 'EMPLOYEE',
  Manager = 'MANAGER',
}

// TODO: 2. Define Interface Loginable
interface ILoginable {
  IsLoginable();
}
// TODO: 3. Define abstract class User
abstract class User {
  //readonly Id: number;
  // Name: string;
  // Email: string;
  // private Password: string;
  CreatedAt: Date;

  constructor(
    public readonly Id: number,
    public Name: string,
    public Email: string,
    private Password: string
  ) {
    this.CreatedAt = new Date();
  }

  abstract GetRole(): string;
  Authenticate(email: string, password: string): boolean {
    return email === this.Email && password === this.Password ? true : false;
  }
}
// TODO: 4. Define Department class
class Department {
  Employees: Employee[];
  constructor(public name: string) {}

  addEmployee(emp: Employee): void {
    this.Employees.push;
  }

  getDepartmentSize(): number {
    return this.Employees.length;
  }
}
// TODO: 5. Define Employee class
class Employee extends User {
  private _salary: number;
  protected Department: Department;
  getNetSalary(): number {
    return this._salary;
  }
  Promote(percentage: number) {
    this._salary += this.Salary * percentage;
    return this._salary;
  }

  get Salary(): number {
    return this._salary;
  }

  set Salary(val: number) {
    this._salary = val;
  }

  GetRole(): string {
    return Role.Employee;
  }
}
// TODO: 6. Define Manager class
class Manager extends Employee {
  team: Employee[] = [];
  addEmployeeToTeam(emp: Employee): void {
    this.team.push(emp);
  }
  removeEmployeeFromTeam(empId: number): void {
    //const result = this.team.find(emp => emp.Id === empId);
    //use filter transformation method
    const index = this.team.findIndex((emp) => emp.Id === empId);
    if (index === -1) {
      alert('Invalid Data');
      return;
    } else {
      this.team.splice(index, 1);
    }
  }
  getTeamReport(): string[] {
    const result: string[] = [];
    for (const member of this.team) {
      result.push(JSON.stringify(member));
    }
    return result;
  }

  GetRole(): string {
    return Role.Manager;
  }
}
// TODO: 7. Define HR utility class
abstract class HR {
  static generateUSerId(): number {
    return Math.floor(Math.random() * 1000000000 + 1);
  }

  static IsEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static calculateTax(salary: number): number {
    return salary * 0.01;
  }

  static generateReport(users: User[]) {
    const result: string[] = [];
    for (const member of users) {
      result.push(JSON.stringify(member));
    }
    return result;
  }
}
// Final test scenario can be written here...
