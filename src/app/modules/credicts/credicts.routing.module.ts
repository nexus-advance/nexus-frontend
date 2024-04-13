import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ActivesComponent } from "./actives/actives.component";
import { HistoryComponent } from "./history/history.component";
import { CreateComponent } from "./create/create.component";
import { DuesComponent } from "./dues/dues.component";

const routes: Routes = [
  // {
  //   path:'',
  //   pathMatch:'full',
  //   redirectTo:'index'
  // },
  {
    path: "actives",
    component: ActivesComponent,
  },
  {
    path: "create",
    component: CreateComponent,
  },
  {
    path: "history",
    component: HistoryComponent,
  },
  {
    path: "dues",
    component: DuesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CredictsRoutingModule {}
