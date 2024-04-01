import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesRoutingModule } from './employees.routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewEmployeeComponent } from "./new-employee/new-employee.component";



@NgModule({
  declarations: [
    IndexComponent,
    NewEmployeeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EmployeesRoutingModule
  ]
})
export class EmployeesModule { }
