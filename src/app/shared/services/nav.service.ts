import { Injectable, OnDestroy } from "@angular/core";
import { Subject, BehaviorSubject, fromEvent } from "rxjs";
import { takeUntil, debounceTime } from "rxjs/operators";
import { Router } from "@angular/router";

// Menu
export interface Menu {
  headTitle1?: string;
  headTitle2?: string;
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  bookmark?: boolean;
  children?: Menu[];
}

@Injectable({
  providedIn: "root",
})
export class NavService implements OnDestroy {
  private unsubscriber: Subject<any> = new Subject();
  public screenWidth: BehaviorSubject<number> = new BehaviorSubject(window.innerWidth);

  // Search Box
  public search: boolean = false;

  // Language
  public language: boolean = false;

  // Mega Menu
  public megaMenu: boolean = false;
  public levelMenu: boolean = false;
  public megaMenuColapse: boolean = window.innerWidth < 1199 ? true : false;

  // Collapse Sidebar
  public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;

  // For Horizontal Layout Mobile
  public horizontal: boolean = window.innerWidth < 991 ? false : true;

  // Full screen
  public fullScreen: boolean = false;

  constructor(private router: Router) {
    this.setScreenWidth(window.innerWidth);
    fromEvent(window, "resize")
      .pipe(debounceTime(1000), takeUntil(this.unsubscriber))
      .subscribe((evt: any) => {
        this.setScreenWidth(evt.target.innerWidth);
        if (evt.target.innerWidth < 991) {
          this.collapseSidebar = true;
          this.megaMenu = false;
          this.levelMenu = false;
        }
        if (evt.target.innerWidth < 1199) {
          this.megaMenuColapse = true;
        }
      });
    if (window.innerWidth < 991) {
      // Detect Route change sidebar close
      this.router.events.subscribe((event) => {
        this.collapseSidebar = true;
        this.megaMenu = false;
        this.levelMenu = false;
      });
    }
  }

  ngOnDestroy() {
    // this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  private setScreenWidth(width: number): void {
    this.screenWidth.next(width);
  }

  MENUITEMS: Menu[] = [
    { path: "/dashboard/main", icon: "home", title: "Tablero", active: false, type: "link", bookmark: true },
    // {
    //   title: "Simple Page",
    //   icon: "home",
    //   type: "sub",
    //   badgeType: "light-primary",
    //   badgeValue: "2",
    //   active: true,
    //   children: [
    //     { path: "/simple-page/first-page", title: "First Page", type: "link" },
    //     { path: "/simple-page/second-page", title: "Second Page", type: "link" },
    //   ],
    // },
    { path: "/clients/index", icon: "user", title: "Clientes", active: false, type: "link", bookmark: true },
    {
      title: "Creditos",
      icon: "table",
      type: "sub",
      badgeType: "light-primary",
      // badgeValue: "2",
      active: true,
      children: [
        { path: "/credicts/actives", title: "Activos", type: "link" },
        { path: "/credicts/history", title: "Historial", type: "link" },
      ],
    },
    // {
    //   title: "Reportes",
    //   icon: "task",
    //   type: "sub",
    //   badgeType: "light-primary",
    //   // badgeValue: "2",
    //   active: true,
    //   children: [
    //     { path: "/form-sheets/recalculation", title: "Recalculo", type: "link" },
    //     { path: "/form-sheets/withholdings", title: "Rentenciones", type: "link" },
    //     { path: "/form-sheets/discounts", title: "Descuentos", type: "link" },
    //   ],
    // },
    {
      title: "Configuraciones",
      icon: "others",
      type: "sub",
      badgeType: "light-primary",
      // badgeValue: "2",
      active: true,
      children: [
        { path: "/config/users", title: "Usuarios", type: "link" },
        // { path: "/config/categorys", title: "Categorias", type: "link" },
        // { path: "/config/institutes", title: "Instituciones", type: "link" },
        // { path: "/config/job-title", title: "Cargo Laboral", type: "link" },
        // { path: "/config/job-type", title: "Tipo Laboral", type: "link" },
        // { path: "/config/departament", title: "Departamento", type: "link" },
        // { path: "/config/rent", title: "Tabla Renta", type: "link" },
        { path: "/config/system", title: "Sistema", type: "link" },
      ],
    },
  ];

  // Array
  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
}
