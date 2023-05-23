import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../employees/employees.service';
import { Employee } from '../employees/employee';

@Component({
  selector: 'empTable',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})


export class empTable implements OnInit {

  public employees = new Map<string, Employee>();

  constructor(private employeesService: EmployeesService) { }

  getColor(value: number) {
    if (value < 100) return '#ffc6c4';
    else return 'white';
  }

  ngOnInit() {
    this.employeesService.getEmployees()
      .subscribe(data => {
        data.forEach(element => {
          if (this.employees.has(element.EmployeeName)) {
            this.employees.get(element.EmployeeName)?.EmployeeShifts.push(element);
          } else {
            let emp: Employee = {
              TotalTimeWorked: 0,
              EmployeeShifts: [element],
            }
            this.employees.set(element.EmployeeName, emp);
          }
        })
        this.employees.forEach(element => {
          element.EmployeeShifts.forEach(el => {
            const TimeWorked = this.employeesService.getDiff(el.StarTimeUtc, el.EndTimeUtc);
            element.TotalTimeWorked += TimeWorked;
          })
        })
      })
  }
}