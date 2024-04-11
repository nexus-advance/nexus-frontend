import { Component } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styles: ``,
})
export class CreateComponent {
  loading: boolean = false;
  submitted: boolean = false;
  relationship: any[] = [];
  public formDiscount: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder) {}
  clearFormDiscount() {
    this.formDiscount = this.fb.group({
      ref_name: ["", [Validators.required]],
      rel_code: ["", [Validators.required]],
      ref_address: ["", [Validators.required]],
      ref_work_place: ["", [Validators.required]],
      ref_phone: ["", [Validators.required]],
    });
    this.submitted = false;
  }
  get formi() {
    return this.formDiscount.controls;
  }
  sendEmployeeDiscount() { 
  }
}
