import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { empTable } from './Table/table.component';
import { pieChartComponent } from './PieChart/piechart.component';


@NgModule({
  declarations: [
    AppComponent,
    empTable,
    pieChartComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
