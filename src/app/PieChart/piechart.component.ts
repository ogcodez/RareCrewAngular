import { Component, OnInit } from '@angular/core';
import { Employee } from '../employees/employee';
import { Chart, ChartConfiguration, ChartItem, registerables, Colors } from 'node_modules/chart.js';
import { EmployeesService } from '../employees/employees.service';


@Component({
  selector: 'piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})

export class pieChartComponent implements OnInit {      
  public employees = new Map<string, Employee>();
  public x: String[] = [];
  public y: number[] = [];

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
        });
        for (const [key, value] of this.employees) {
          this.x.push(key);
          this.y.push(value.TotalTimeWorked);
        }
        this.createChart();
      })
      
  }

  createChart(): void {
    Chart.register(...registerables,Colors);
    const data = {
      labels: this.x,
      datasets: [{
        label: 'Number of hours worked',
        data: this.y,
        tooltip: {
          callbacks: {
              label: function(context) {
                  let label = context.label;
                  let value = context.formattedValue;
  
                  if (!label)
                      label = 'Unknown'
  
                  let sum = 0;
                  let dataArr = context.chart.data.datasets[0].data;
                  dataArr.map(data => {
                      sum += Number(data);
                  });
  
                  let percentage = (value * 100 / sum).toFixed(2) + '%';
                  return label + ": " + percentage;
              }
          }
      }
      }]
    }
    const options = {
      scales: {
        y: {
          beginAtZero: true,
          display: false
        }
      }
    }
    const config: ChartConfiguration = {
      type: 'pie',
      data: data,
      options: options
    }
    const chartItem: ChartItem = document.getElementById('my-chart') as ChartItem

    new Chart(chartItem, config)
  }
}


