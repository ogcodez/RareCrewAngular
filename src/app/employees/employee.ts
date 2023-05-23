
import { EmployeeShift } from "./employeeshift";
import { EmployeesService } from "./employees.service";

export interface Employee {
     TotalTimeWorked: number;
     EmployeeShifts: EmployeeShift[];
}


