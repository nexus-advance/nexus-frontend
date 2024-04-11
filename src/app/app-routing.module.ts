import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContentComponent } from "./shared/components/layout/content/content.component";
import { FullComponent } from "./shared/components/layout/full/full.component";
import { full } from "./shared/routes/full.routes";
import { content } from "./shared/routes/routes";
import { AuthGuard } from "./modules/core/guards/auth.guard";
import { NoAuthGuard } from "./modules/core/guards/noAuth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "auth/login",
    pathMatch: "full",
  },
  {
    path: "",
    component: ContentComponent,
    canActivate: [AuthGuard],
    children: [
      ...content,
      {
        path: "dashboard",
        loadChildren: () =>
          import("./modules/dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
      {
        path: "clients",
        loadChildren: () =>
          import("./modules/clients/clients.module").then((m) => m.ClientsModule),
      }, 
      {
        path: "credicts",
        loadChildren: () =>
          import("./modules/credicts/credicts.module").then((m) => m.CredictsModule),
      }, 
    ]
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./modules/auth/auth.module").then((m) => m.AuthModule),
    canActivate: [NoAuthGuard],
  },
  {
    path: "**",
    redirectTo: "auth/login",
  },
];

@NgModule({
  imports: [
    [
      RouterModule.forRoot(routes, {
        anchorScrolling: "enabled",
        scrollPositionRestoration: "enabled",
      }),
    ],
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
