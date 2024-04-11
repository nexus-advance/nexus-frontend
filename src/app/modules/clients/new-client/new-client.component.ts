import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ClientsService } from 'src/app/shared/services';
const Swal = require('sweetalert2')

@Component({
  selector: "app-new-client",
  templateUrl: "./new-client.component.html",
  styles: ``,
})
export class NewClientComponent implements OnInit {
  model2: NgbDateStruct;
  model3: NgbDateStruct;
  model4: NgbDateStruct;
  model5: NgbDateStruct;

  modelstart: NgbDateStruct;
  modelend: NgbDateStruct;
  submitted: boolean = false;
  loading: boolean = false;
  constructor(
    private fb: UntypedFormBuilder,
    private employesService: ClientsService,
    private rutaActiva: ActivatedRoute,
    public router: Router
  ) {}

  @Input() color: any;
  navSelected = "1";
  public editProfile: UntypedFormGroup;
  public formDiscount: UntypedFormGroup;
  id = "";
  ngOnInit(): void {
    this.id = this.rutaActiva.snapshot.params["id"] ?? "";
    this.getCatalogs();
    this.clearForm();
    this.clearFormDiscount();
    this.getReferences();
  }
  getEmploye() {
    if (this.id == null || this.id == undefined || this.id.length < 30) return;
    this.loading = true;
    this.employesService.getOne(this.id).subscribe({
      next: (data: any) => {
        let employee = data.data;
        let cli_dui_date_expiration: string = employee.cli_dui_date_expiration;
        if (cli_dui_date_expiration.split("T").length == 2) {
          cli_dui_date_expiration = cli_dui_date_expiration.split("T")[0];
        }
        let cli_dui_date_expedition: string = employee.cli_dui_date_expedition;
        if (cli_dui_date_expedition.split("T").length == 2) {
          cli_dui_date_expedition = cli_dui_date_expedition.split("T")[0];
        }
        let cli_birth_date: string = employee.cli_birth_date;
        if (cli_birth_date.split("T").length == 2) {
          cli_birth_date = cli_birth_date.split("T")[0];
        }
        this.editProfile.patchValue({
          cli_full_name: employee.cli_full_name,
          cli_birth_date,
          mar_code: employee.mar_code,
          cli_dui: employee.cli_dui,
          cli_nit: employee.cli_nit,
          cli_children_number: employee.cli_children_number,
          cli_spouse_name: employee.cli_spouse_name,
          cli_email: employee.cli_email,
          prf_code: employee.prf_code,
          edl_code: employee.edl_code,
          cli_place_expedition: employee.cli_place_expedition,
          cli_dui_date_expedition,
          cis_code: employee.cis_code,
          cli_dui_date_expiration,
          gen_code: employee.gen_code,
          cli_is_taxpayer: employee.cli_is_taxpayer,
          cli_no_taxpayer: employee.cli_no_taxpayer,
          // cli_mount_month: 0,
          cli_have_other_incomer: employee.cli_have_other_incomer,
          cli_bussiness_tipe: employee.cli_bussiness_tipe,
          cli_time_bussiness: employee.cli_time_bussiness,
          cli_address_bussiness: employee.cli_address_bussiness,
          cli_dep_code_bussines: employee.cli_dep_code_bussines,
          cli_mun_code_bussines: employee.cli_mun_code_bussines,
          cli_dis_code_bussines: employee.cli_dis_code_bussines,
          cli_daily_sell: employee.cli_daily_sell,
          cli_daily_buy: employee.cli_daily_buy,
          cli_daily_gain: employee.cli_daily_gain,
          cli_address: employee.cli_address,
          cli_phone: employee.cli_phone,
          cli_cell_phone: employee.cli_cell_phone,
          cli_dep_code: employee.cli_dep_code,
          cli_mun_code: employee.cli_mun_code,
          cli_dis_code: employee.cli_dis_code,
          cli_have_time_alive: employee.cli_have_time_alive,
          cli_time_alive: employee.cli_time_alive,
          cli_tenant_name: employee.cli_tenant_name,
          cli_tenant_phone: employee.cli_tenant_phone,

          cli_mount_month_500: employee.cli_mount_month == 500,
          cli_mount_month_1000: employee.cli_mount_month == 1000,
          cli_mount_month_3500: employee.cli_mount_month == 4500,
          cli_mount_month_na: employee.cli_mount_month == 0,
        });
        if (
          employee.cli_dep_code_bussines != null &&
          employee.cli_dep_code_bussines.length > 1
        ) {
          this.onChangeDepBus(employee.cli_dep_code_bussines);
        }
        if (
          employee.cli_mun_code_bussines != null &&
          employee.cli_mun_code_bussines.length > 1
        ) {
          this.onChangeMunBus(employee.cli_mun_code_bussines);
        }

        if (employee.cli_dep_code != null && employee.cli_dep_code.length > 1) {
          this.onChangeDepDom(employee.cli_dep_code);
        }
        if (employee.cli_mun_code != null && employee.cli_mun_code.length > 1) {
          this.onChangeMunDom(employee.cli_mun_code);
        }
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
  getReferences() {
    if (this.id == null || this.id == undefined || this.id.length < 30) return;
    this.loading = true;
    this.employesService.getReferences(this.id).subscribe({
      next: (data: any) => {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
        this.discounts = data.data;
        this.totalDiscount = 0;
        this.discounts.forEach((element) => {
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
  cli_have_other_incomer = false;

  clearForm() {
    this.editProfile = this.fb.group({
      cli_full_name: ["", [Validators.required]],
      cli_birth_date: ["", []],
      mar_code: ["", []],
      cli_dui: ["", []],
      cli_nit: ["", []],
      cli_children_number: ["", []],
      cli_spouse_name: ["", []],
      cli_email: ["", []],
      prf_code: ["", []],
      edl_code: ["", []],
      cli_place_expedition: ["", []],
      cli_dui_date_expedition: ["", []],
      cis_code: ["", []],
      cli_dui_date_expiration: ["", []],
      gen_code: ["", []],
      cli_is_taxpayer: [false, []],
      cli_no_taxpayer: ["", []],
      cli_mount_month: [0, []],
      cli_mount_month_500: [false, []],
      cli_mount_month_1000: [false, []],
      cli_mount_month_3500: [false, []],
      cli_mount_month_na: [false, []],
      cli_have_other_incomer: [false, []],
      cli_bussiness_tipe: ["", []],
      cli_time_bussiness: [0, []],
      cli_address_bussiness: ["", []],
      cli_dep_code_bussines: ["", []],
      cli_mun_code_bussines: ["", []],
      cli_dis_code_bussines: ["", []],
      cli_daily_sell: [0, []],
      cli_daily_buy: [0, []],
      cli_daily_gain: [0, []],
      cli_address: ["", []],
      cli_phone: ["", []],
      cli_cell_phone: ["", []],
      cli_dep_code: ["", []],
      cli_mun_code: ["", []],
      cli_dis_code: ["", []],
      cli_have_time_alive: [false, []],
      cli_time_alive: [0, []],
      cli_tenant_name: ["", []],
      cli_tenant_phone: ["", []],
    });
    this.submitted = false;
  }

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

  genders: any[] = [];
  marks: any[] = [];
  departaments: any[] = [];
  bussines_nex_mun_municipalities: any[] = [];
  bussines_nex_dis_districts: any[] = [];
  address_nex_mun_municipalities: any[] = [];
  address_nex_dis_districts: any[] = [];
  education: any[] = [];
  profession: any[] = [];
  relationship: any[] = [];
  civilStatus: any[] = [];
  selectgroupby = "";

  getCatalogs() {
    this.loading = true;
    this.employesService.getCatalogs().subscribe({
      next: (data: any) => {
        this.genders = data.data.genders;
        this.marks = data.data.marks;
        this.departaments = data.data.departaments;
        this.education = data.data.education;
        this.profession = data.data.profession;
        this.relationship = data.data.relationship;
        this.civilStatus = data.data.civilStatus;
        this.submitted = false;
        this.loading = false;
        this.getEmploye();
      },
      error: (err) => {
        this.submitted = false;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      },
    });
  }

  onChangeDepBus(value) {
    this.bussines_nex_mun_municipalities = this.departaments.filter(
      (e) => e.dep_code == value
    )[0].nex_mun_municipalities;
  }
  onChangeMunBus(value) {
    this.bussines_nex_dis_districts =
      this.bussines_nex_mun_municipalities.filter(
        (e) => e.mun_code == value
      )[0].nex_dis_districts;
  }

  onChangeDepDom(value) {
    this.address_nex_mun_municipalities = this.departaments.filter(
      (e) => e.dep_code == value
    )[0].nex_mun_municipalities;
  }
  onChangeMunDom(value) {
    this.address_nex_dis_districts = this.address_nex_mun_municipalities.filter(
      (e) => e.mun_code == value
    )[0].nex_dis_districts;
  }
  get form() {
    return this.editProfile.controls;
  }
  get formi() {
    return this.formDiscount.controls;
  }

  sendEmployeeDate() {
    console.log(this.form["cli_time_alive"].errors);

    this.submitted = true;
    if (this.editProfile.valid) {
      this.loading = true;

      let birthdate = this.form["cli_birth_date"].value;

      let emp_birth_date = null;
      console.log("birthdate");
      console.log(birthdate);
      if (birthdate != undefined) {
        emp_birth_date =
          birthdate.day + "-" + birthdate.month + "-" + birthdate.year;
      }

      // let dui_date_expedition = this.form['cli_dui_date_expedition'].value;
      // let cli_dui_date_expedition = null;
      // if (dui_date_expedition != undefined) {
      //   cli_dui_date_expedition = dui_date_expedition.day + "-" + dui_date_expedition.month + "-" + dui_date_expedition.year;
      // }

      let dui_date_expiration = this.form["cli_dui_date_expiration"].value;

      let cli_dui_date_expiration = null;
      if (dui_date_expiration != undefined) {
        cli_dui_date_expiration =
          dui_date_expiration.day +
          "-" +
          dui_date_expiration.month +
          "-" +
          dui_date_expiration.year;
      }

      let data = this.editProfile.value;
      if (data.mar_code == null || data.mar_code.length < 5) {
        delete data.mar_code;
      }
      if (data.cis_code == null || data.cis_code.length < 5) {
        delete data.cis_code;
      }
      if (data.edl_code == null || data.edl_code.length < 5) {
        delete data.edl_code;
      }
      if (data.prf_code == null || data.prf_code.length < 5) {
        delete data.prf_code;
      }
      if (
        data.cli_dep_code_bussines == null ||
        data.cli_dep_code_bussines.length < 5
      ) {
        delete data.cli_dep_code_bussines;
      }
      if (
        data.cli_mun_code_bussines == null ||
        data.cli_mun_code_bussines.length < 5
      ) {
        delete data.cli_mun_code_bussines;
      }
      if (
        data.cli_dis_code_bussines == null ||
        data.cli_dis_code_bussines.length < 5
      ) {
        delete data.cli_dis_code_bussines;
      }
      if (data.cli_dep_code == null || data.cli_dep_code.length < 5) {
        delete data.cli_dep_code;
      }
      if (data.cli_mun_code == null || data.cli_mun_code.length < 5) {
        delete data.cli_mun_code;
      }
      if (data.cli_dis_code == null || data.cli_dis_code.length < 5) {
        delete data.cli_dis_code;
      }
      if (data.gen_code == null || data.gen_code.length < 5) {
        delete data.gen_code;
      }
      delete data.cli_have_time_alive;
      if (
        data.cli_dui_date_expedition == null ||
        data.cli_dui_date_expedition.length == 0
      ) {
        data.cli_dui_date_expedition = null;
      }
      console.log("data.cli_birth_date");
      console.log(data.cli_birth_date);
      if (data.cli_birth_date == null || data.cli_birth_date.length == 0) {
        data.cli_birth_date = null;
      }
      if (
        data.cli_dui_date_expiration == null ||
        data.cli_dui_date_expiration.length == 0
      ) {
        data.cli_dui_date_expiration = null;
      }

      data.cli_mount_month = 0;
      if (data.cli_mount_month_500) {
        data.cli_mount_month = 500;
      }
      if (data.cli_mount_month_1000) {
        data.cli_mount_month = 1000;
      }
      if (data.cli_mount_month_3500) {
        data.cli_mount_month = 3500;
      }
      if (data.cli_mount_month_na) {
        data.cli_mount_month = 0;
      }
      delete data.cli_mount_month_500;
      delete data.cli_mount_month_1000;
      delete data.cli_mount_month_3500;
      delete data.cli_mount_month_na;
      // Login Api
      this.employesService.create(data, this.id).subscribe({
        next: (data: any) => {
          this.id = data.data.cli_code;
          // this.router.navigate(["/employees/update/" + this.id]);
          Swal.fire({
            type: "success",
            title: "Exito",
            text:
              "Cliente " +
              (this.id.length > 10 ? "Actualizado" : "Creado") +
              " con exito!",
            showConfirmButton: true,
            icon: "success",
          });
          if (this.id.length > 10) this.clearForm();
          setTimeout(() => {
            this.loading = false;
          }, 500);
          this.submitted = false;
        },
        error: (err: any) => {
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

      let data: any = this.formDiscount.value;
      data.cli_code = this.id;
      // Login Api
      this.employesService.createReferences(data).subscribe({
        next: (data: any) => {
          Swal.fire({
            type: "success",
            title: "Exito",
            text: "Agregado con exito!",
            showConfirmButton: true,
            icon: "success",
          });
          this.getReferences();
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
    const data = this.discounts.filter((e: any) => e.ref_code == id_);

    Swal.fire({
      title: "¿Está seguro?",
      text:
        "Estas por eliminar: " + data[0].ref_name,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#364574",
      cancelButtonColor: "rgb(243, 78, 78)",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "No, Cancelar!",
    }).then((result) => {
      if (result.value) {
        this.employesService.deleteReference(id_).subscribe({
          next: (resp) => {
            var r: any = resp;
            if (r.status) {
              this.getReferences();

              Swal.fire({
                type: "success",
                title: "Exito",
                text: "Descuento eliminado con exito!",
                showConfirmButton: true,
                icon: "success",
              });
            }
          },
        });
      }
    });
  }
}
