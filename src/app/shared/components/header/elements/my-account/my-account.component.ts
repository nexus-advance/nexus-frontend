import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/modules/core/services";

@Component({
  selector: "app-my-account",
  templateUrl: "./my-account.component.html",
  styleUrls: ["./my-account.component.scss"],
})
export class MyAccountComponent implements OnInit {
  public userName: string;
  public profileImg: "assets/images/dashboard/profile.jpg";

  currentUser;
  constructor(
    public router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    if (JSON.parse(localStorage.getItem("user"))) {
    } else {
    }
  }

  ngOnInit() { }
  logoutFunc() {
    this.authenticationService.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
