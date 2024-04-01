import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpreadsheetsService } from 'src/app/shared/services';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent {
  loading: boolean = false;
  submitted: boolean = false;
  public formSheets: UntypedFormGroup;
  months: any[] = [];
  paymentsType: any[] = [];
  employees: any[] = [];
  employee: any = null;
  constructor(
    private fb: UntypedFormBuilder,
    private rutaActiva: ActivatedRoute,
    private services: SpreadsheetsService,
    public router: Router,
  ) {
    this.clearForm();
    this.getCatalog();
  }
  veamos() {
    console.log(this.employee)
  }
  getCatalog() {
    this.services.getCatalogs().subscribe({
      next: (value: any) => { 
        this.months = value.data.mounts;
        this.paymentsType = value.data.paymentsType;
        this.employees = value.data.employes;
      },
    });
  }
  clearForm() {
    this.formSheets = this.fb.group({
      name: ['', [Validators.required]],
      month: ['', [Validators.required]],
      paymentsType: ['', [Validators.required]],
    });
    this.submitted = false;
  }
  sendEmployeeDate() {
    this.submitted = true;
    if (this.formSheets.valid) {

    }
  }
  get form() {
    return this.formSheets.controls;
  }
}
