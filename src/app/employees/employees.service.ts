import { EmployeeShift } from './employeeshift';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { Chart, ChartConfiguration, ChartItem, registerables, Colors } from 'node_modules/chart.js';


@Injectable({
    providedIn: 'root'
})
export class EmployeesService{

    private _url: string = "https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==";
    constructor(private http: HttpClient) { }
    
    getEmployees(): Observable<EmployeeShift[]> {
        return this.http.get<EmployeeShift[]>(this._url);
    }

    getDiff(startDate: Date, endDate: Date): number {
        var start = new Date(startDate).getTime();
        var end = new Date(endDate).getTime();

        return Math.round(Math.abs(end - start) / 36e5 + Number.EPSILON);
    }

}