import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IndexComponent } from "./index/index.component";
import { NewClientComponent } from "./new-client/new-client.component";

const routes: Routes = [
  // {
  //   path:'',
  //   pathMatch:'full',
  //   redirectTo:'index'
  // },
  {
    path: "index",
    component: IndexComponent,
  },
  {
    path: "create",
    component: NewClientComponent,
  },
  {
    path: "update/:id",
    component: NewClientComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule { }
