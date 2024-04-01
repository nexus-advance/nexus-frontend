import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { EmployesService } from 'src/app/shared/services/employes.service';
const Swal = require('sweetalert2')

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styles: ``
})
export class NewEmployeeComponent implements OnInit {

  model2: NgbDateStruct;
  model3: NgbDateStruct;
  model4: NgbDateStruct;


  modelstart: NgbDateStruct;
  modelend: NgbDateStruct;
  submitted: boolean = false;
  loading: boolean = false;
  constructor(
    private fb: UntypedFormBuilder,
    private employesService: EmployesService,
    private rutaActiva: ActivatedRoute,
    public router: Router,
  ) {
    this.getCatalogs();
  }

  @Input() color: any;
  navSelected = "1";
  public editProfile: UntypedFormGroup;
  public formDiscount: UntypedFormGroup;
  id = "";
  ngOnInit(): void {
    this.id = this.rutaActiva.snapshot.params["id"] ?? '';
    this.clearForm();
    this.clearFormDiscount();
    this.getEmploye();
    this.getDiscounts();
  }
  getEmploye() {
    if (this.id == null || this.id == undefined || this.id.length < 30) return;
    this.loading = true;
    this.employesService
      .getOne(this.id)
      .subscribe({
        next: (data: any) => {
          let employee = data.data;
          let birth_date = employee.emp_birth_date.split("T")[0];
          let [year, month, day] = birth_date.split('-');
          let obj = {
            year: parseInt(year), month: parseInt(month), day:
              parseInt(day.split(' ')[0].trim())
          };
          this.model2 = obj;


          let start_date = employee.emp_admission_date.split("T")[0];
          [year, month, day] = start_date.split('-');
          obj = {
            year: parseInt(year), month: parseInt(month), day:
              parseInt(day.split(' ')[0].trim())
          };
          this.model3 = obj;



          let end_date = employee.emp_departure_date.split("T")[0];
          [year, month, day] = end_date.split('-');
          obj = {
            year: parseInt(year), month: parseInt(month), day:
              parseInt(day.split(' ')[0].trim())
          };
          this.model4 = obj;
          this.editProfile.patchValue({
            employe_code: employee.emp_code_employee,
            name_1: employee.emp_first_name,
            name_2: employee.emp_second_name,
            name_3: employee.emp_third_name,
            surname_1: employee.emp_first_surname,
            surname_2: employee.emp_second_surname,
            surname_3: employee.emp_married_surname,

            gender: employee.emp_codgen,
            // birth_date, //TODO
            // start_date,//TODO
            // end_date: employee.emp_departure_date,//TODO
            address: employee.emp_address,
            phone: employee.emp_cel_phone,
            dui: employee.emp_dui,
            nit: employee.emp_nit,
            isss: employee.emp_isss,
            afp: employee.emp_afp,
            emp_hourly_wage: Number(employee.emp_hourly_wage),
            emp_daily_wage: Number(employee.emp_daily_wage),
            emp_base_salary: Number(employee.emp_base_salary),

            emp_viatic: Number(employee.emp_viatic),
            emp_complementary_diatic: Number(employee.emp_complementary_diatic),
            departament: employee.emp_codlad,
            job_title: employee.emp_codjti,
            job_type: employee.emp_codwst,
            // immediate_superior: employee.emp_code_employee,

          });
          this.submitted = false;
          this.loading = false;
        },
        error: (err) => {
          this.submitted = false;
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        },
      });
  }
  discounts: any[] = [];
  totalDiscount = 0;
  getDiscounts() {
    if (this.id == null || this.id == undefined || this.id.length < 30) return;
    this.loading = true;
    this.employesService
      .getDiscounts(this.id)
      .subscribe({
        next: (data: any) => {
          setTimeout(() => {
            this.loading = false;
          }, 1000);
          this.discounts = data.data;
          this.totalDiscount = 0;
          this.discounts.forEach(element => {
            this.totalDiscount = this.totalDiscount + Number(element.des_amount);

          });
        },
        error: (err) => {
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        },
      });
  }
  changeTab(valor: any) {
    this.navSelected = valor;
  }
  clearForm() {
    this.editProfile = this.fb.group({
      employe_code: ['', [Validators.required]],
      name_1: ['', [Validators.required]],
      name_2: ['', [Validators.required]],
      name_3: [''],
      surname_1: ['', [Validators.required]],
      surname_2: ['', [Validators.required]],
      surname_3: [''],
      gender: ['', [Validators.required]],
      birth_date: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      end_date: [''],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      dui: ['', [Validators.required]],
      nit: ['', [Validators.required]],
      isss: ['', [Validators.required]],
      afp: ['', [Validators.required]],
      emp_hourly_wage: ['', [Validators.required]],
      emp_daily_wage: ['', [Validators.required]],
      emp_base_salary: ['', [Validators.required]],
      emp_viatic: [''],
      emp_complementary_diatic: [''],
      departament: ['', [Validators.required]],
      job_title: ['', [Validators.required]],
      job_type: ['', [Validators.required]],
      immediate_superior: [''],
    });
    this.submitted = false;
  }

  clearFormDiscount() {
    this.formDiscount = this.fb.group({
      institute: ['', [Validators.required]],
      detail: [''],
      startdate: ['', [Validators.required]],
      enddate: ['', [Validators.required]],
      dues: ['0', [Validators.required]],
      amount: ['0', [Validators.required]],
    });
    this.submitted = false;
  }

  genders: any[] = [];
  laborsDepartaments: any[] = [];
  jobTitle: any[] = [];
  workStatus: any[] = [];
  institutions: any[] = [];
  selectgroupby = '';
  getCatalogs() {
    this.loading = true;
    this.employesService
      .getCatalogs()
      .subscribe({
        next: (data: any) => {
          this.genders = data.data.hos_gen_genders;
          this.laborsDepartaments = data.data.hos_lad_labor_department;
          this.jobTitle = data.data.hos_jti_job_title;
          this.workStatus = data.data.hos_wst_work_status;
          this.institutions = data.data.hos_din_discount_institutions;
          this.submitted = false;
          this.loading = false;
        },
        error: (err) => {
          this.submitted = false;
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        },
      });
  }
  get form() {
    return this.editProfile.controls;
  }
  get formi() {
    return this.formDiscount.controls;
  }


  sendEmployeeDate() {

    this.submitted = true;
    if (this.editProfile.valid) {
      this.loading = true;
      // let data = this.editProfile.value;

      let birthdate = this.form['birth_date'].value;
      let emp_birth_date = birthdate.day + "-" + birthdate.month + "-" + birthdate.year;

      let startdate = this.form['start_date'].value;
      let emp_admission_date = startdate.day + "-" + startdate.month + "-" + startdate.year;


      let data: any = {
        "emp_code_employee": this.form['employe_code'].value,
        "emp_first_name": this.form['name_1'].value,
        "emp_second_name": this.form['name_2'].value,
        "emp_third_name": this.form['name_3'].value,
        "emp_first_surname": this.form['surname_1'].value,
        "emp_second_surname": this.form['surname_2'].value,
        "emp_married_surname": this.form['surname_3'].value,
        "emp_codgen": this.form['gender'].value,
        "emp_birth_date": emp_birth_date,
        "emp_admission_date": emp_admission_date,
        "emp_address": this.form['address'].value,
        "emp_cel_phone": this.form['phone'].value,
        "emp_dui": this.form['dui'].value,
        "emp_nit": this.form['nit'].value,
        "emp_isss": this.form['isss'].value,
        "emp_afp": this.form['afp'].value,
        "emp_hourly_wage": this.form['emp_hourly_wage'].value,
        "emp_daily_wage": this.form['emp_daily_wage'].value,
        "emp_base_salary": this.form['emp_base_salary'].value,
        "emp_viatic": this.form['emp_viatic'].value,
        "emp_complementary_diatic": this.form['emp_complementary_diatic'].value,
        "emp_codlad": this.form['departament'].value,
        "emp_codjti": this.form['job_title'].value,
        "emp_codwst": this.form['job_type'].value,
      };
      let enddate = this.form['end_date'].value;
      if (enddate != null && enddate != '') {
        let emp_departure_date = enddate.day + "-" + enddate.month + "-" + enddate.year;
        data.emp_departure_date = emp_departure_date;
      }
      if (this.form['immediate_superior'].value != null && this.form['immediate_superior'].value != '') {
        data.emp_codempboss = this.form['immediate_superior'].value;
      }

      // Login Api
      this.employesService
        .create(data, this.id)
        .subscribe({
          next: (data: any) => {
            this.id = data.data.emp_code;

            // this.router.navigate(["/employees/update/" + this.id]);
            Swal.fire({
              type: 'success',
              title: 'Exito',
              text: 'Empleado ' + (this.id.length > 10 ? 'Actualizado' : 'Creado') + ' con exito!',
              showConfirmButton: true,
              icon: "success"

            });
            if (this.id.length > 10) this.clearForm();
            setTimeout(() => {
              this.loading = false;
            }, 500);
            this.submitted = false;

          },
          error: (err) => {
            this.submitted = false;
            setTimeout(() => {
              this.loading = false;
            }, 500);
          },
        });
    }
  }
  sendEmployeeDiscount() {

    this.submitted = true;
    if (this.formDiscount.valid) {
      this.loading = true;
      let startdate = this.formi['startdate'].value;
      startdate = startdate.day + "-" + startdate.month + "-" + startdate.year;

      let enddate = this.formi['enddate'].value;
      enddate = enddate.day + "-" + enddate.month + "-" + enddate.year;

      let data: any = {
        "des_coddin": this.formi['institute'].value,
        "des_reference": this.formi['detail'].value,
        "emp_start_date": startdate,
        "emp_end_date": enddate,
        "des_number_dues": Number(this.formi['dues'].value),
        "des_amount": Number(this.formi['amount'].value),
        "des_codemp": this.id
      };

      // Login Api
      this.employesService
        .create_discount(data)
        .subscribe({
          next: (data: any) => {
            Swal.fire({
              type: 'success',
              title: 'Exito',
              text: 'Descuento agregado con exito!',
              showConfirmButton: true,
              icon: "success"
            });
            this.getDiscounts();
            this.clearFormDiscount();
            setTimeout(() => {
              this.loading = false;
            }, 500);
            this.submitted = false;

          },
          error: (err) => {
            this.submitted = false;
            setTimeout(() => {
              this.loading = false;
            }, 500);
          },
        });
    }
  }


  deleteDiscount(id_: any) {
    var data = this.discounts.filter((e: any) => e.des_code == id_);

    Swal.fire({
      title: "¿Está seguro?",
      text: "Estas por eliminar: " + data[0].hos_din_discount_institutions.din_name,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#364574",
      cancelButtonColor: "rgb(243, 78, 78)",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "No, Cancelar!",
    }).then((result) => {
      if (result.value) {
        this.employesService.deleteDiscount(id_).subscribe({
          next: (resp) => {
            var r: any = resp;
            if (r.status) {
              this.getDiscounts();

              Swal.fire({
                type: 'success',
                title: 'Exito',
                text: 'Descuento eliminado con exito!',
                showConfirmButton: true,
                icon: "success"

              });
            }
          },
        });
      }
    });
  }
}
