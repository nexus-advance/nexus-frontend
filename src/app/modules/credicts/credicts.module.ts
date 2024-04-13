import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivesComponent } from './actives/actives.component';
import { CreateComponent } from './create/create.component';
import { DuesComponent } from './dues/dues.component';
import { CredictsRoutingModule } from './credicts.routing.module';
import { HistoryComponent } from './history/history.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';



@NgModule({
  declarations: [
    ActivesComponent,
    HistoryComponent,
    CreateComponent,
    DuesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CredictsRoutingModule,
    AutocompleteLibModule
  ]
})
export class CredictsModule { }
