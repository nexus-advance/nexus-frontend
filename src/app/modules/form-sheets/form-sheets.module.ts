import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { FormSheetsRoutingModule } from './form-sheets.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateComponent } from './create/create.component';



@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormSheetsRoutingModule
  ]
})
export class FormSheetsModule { }
