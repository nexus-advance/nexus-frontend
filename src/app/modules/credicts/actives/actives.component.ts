import { Component } from "@angular/core";

@Component({
  selector: "app-actives",
  templateUrl: "./actives.component.html",
  styles: ``,
})
export class ActivesComponent {
  loading: boolean = false;
  employyes: any[] = [];
}
