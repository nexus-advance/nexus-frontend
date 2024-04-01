import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { USER_KEY } from '../../core/const';
import { AuthenticationService } from '../../core/services';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public newUser = false;
  // public user: firebase.User;
  public loginForm: FormGroup;
  public show: boolean = false
  public submitted: boolean = false
  public loading: boolean = false
  public errorMessage: any;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.loginForm = this.fb.group({
      email: ["9505002", [Validators.required]],
      password: ["9505002", Validators.required],
    });

    if (this.authenticationService.currentUserValue) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit() {
    document.body.classList.remove("dark-only");
  }
  get f() {
    return this.loginForm.controls;
  }

  login() { 
    this.submitted = true;
    if (this.loginForm.valid) {
      this.loading = true;

      // Login Api
      this.authenticationService
        .login(this.f["email"].value, this.f["password"].value)
        .subscribe({
          next: (data: any) => {
            if (data.status == 201) {  
              localStorage.setItem(USER_KEY, JSON.stringify(data.data)); 
              localStorage.setItem("token", data.data.token); 
              this.router.navigate(["/dashboard/main"]);
              document.body.classList.add("dark-only");  
            } else { 
              setTimeout(() => {
                this.loading = false;
              }, 1000);
            }
            this.submitted = false;

          },
          error: (err) => { 
            this.submitted = false;
            setTimeout(() => {
              this.loading = false;
            }, 1000);
          },
        });
    }
  }

  showPassword() {
    this.show = !this.show
  }
}
