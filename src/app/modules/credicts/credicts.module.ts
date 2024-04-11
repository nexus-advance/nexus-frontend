import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivesComponent } from './actives/actives.component';
import { CreateComponent } from './create/create.component';
import { CredictsRoutingModule } from './credicts.routing.module';
import { HistoryComponent } from './history/history.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ActivesComponent,
    HistoryComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CredictsRoutingModule
  ]
})
export class CredictsModule { }
