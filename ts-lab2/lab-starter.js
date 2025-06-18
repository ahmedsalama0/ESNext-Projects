var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// ========================
// 🧪 TypeScript HR Lab Starter
// ========================
//
// TODO: 1. Define enum Role
var Role;
(function (Role) {
    Role["User"] = "USER";
    Role["Employee"] = "EMPLOYEE";
    Role["Manager"] = "MANAGER";
})(Role || (Role = {}));
// TODO: 3. Define abstract class User
var User = /** @class */ (function () {
    function User(Id, Name, Email, Password) {
        this.Id = Id;
        this.Name = Name;
        this.Email = Email;
        this.Password = Password;
        this.CreatedAt = new Date();
    }
    User.prototype.Authenticate = function (email, password) {
        return email === this.Email && password === this.Password ? true : false;
    };
    return User;
}());
// TODO: 4. Define Department class
var Department = /** @class */ (function () {
    function Department(name) {
        this.name = name;
    }
    Department.prototype.addEmployee = function (emp) {
        this.Employees.push;
    };
    Department.prototype.getDepartmentSize = function () {
        return this.Employees.length;
    };
    return Department;
}());
// TODO: 5. Define Employee class
var Employee = /** @class */ (function (_super) {
    __extends(Employee, _super);
    function Employee() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Employee.prototype.getNetSalary = function () {
        return this._salary;
    };
    Employee.prototype.Promote = function (percentage) {
        this._salary += this.Salary * percentage;
        return this._salary;
    };
    Object.defineProperty(Employee.prototype, "Salary", {
        get: function () {
            return this._salary;
        },
        set: function (val) {
            this._salary = val;
        },
        enumerable: false,
        configurable: true
    });
    Employee.prototype.GetRole = function () {
        return Role.Employee;
    };
    return Employee;
}(User));
// TODO: 6. Define Manager class
var Manager = /** @class */ (function (_super) {
    __extends(Manager, _super);
    function Manager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.team = [];
        return _this;
    }
    Manager.prototype.addEmployeeToTeam = function (emp) {
        this.team.push(emp);
    };
    Manager.prototype.removeEmployeeFromTeam = function (empId) {
        //const result = this.team.find(emp => emp.Id === empId);
        //use filter transformation method
        var index = this.team.findIndex(function (emp) { return emp.Id === empId; });
        if (index === -1) {
            alert('Invalid Data');
            return;
        }
        else {
            this.team.splice(index, 1);
        }
    };
    Manager.prototype.getTeamReport = function () {
        var result = [];
        for (var _i = 0, _a = this.team; _i < _a.length; _i++) {
            var member = _a[_i];
            result.push(JSON.stringify(member));
        }
        return result;
    };
    Manager.prototype.GetRole = function () {
        return Role.Manager;
    };
    return Manager;
}(Employee));
// TODO: 7. Define HR utility class
var HR = /** @class */ (function () {
    function HR() {
    }
    HR.generateUSerId = function () {
        return Math.floor(Math.random() * 1000000000 + 1);
    };
    HR.IsEmailValid = function (email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    HR.calculateTax = function (salary) {
        return salary * 0.01;
    };
    HR.generateReport = function (users) {
        var result = [];
        for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
            var member = users_1[_i];
            result.push(JSON.stringify(member));
        }
        return result;
    };
    return HR;
}());
// Final test scenario can be written here...
