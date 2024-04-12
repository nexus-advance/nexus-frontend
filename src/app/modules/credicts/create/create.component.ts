import { Component } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ClientsService, CreditsService } from "src/app/shared/services";
import { Client, GirosResponse } from "../../clients/interfaces/client-response.interface";
const Swal = require('sweetalert2')

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styles: ``,
})
export class CreateComponent {
  loading: boolean = false;
  submitted: boolean = false;
  relationship: any[] = [];
  public formCredit: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private serviceClients: ClientsService,
    private service: CreditsService,
  ) {
    this.clearFormDiscount();
    this.getAllClients();
    this.getTaxse();
    const newDate = new Date();
    const m = newDate.getMonth() + 1;
    const month = m > 9 ? m : "0" + m;
    this.formCredit.patchValue({
      cre_date_start: newDate.getFullYear() + "-" + month + "-" + newDate.getDate(),
    });
  }
  clearFormDiscount() {
    this.formCredit = this.fb.group({
      cre_date_start: ["", [Validators.required]],
      per_code: ["", [Validators.required]],
      cre_neto_amount: ["0", [Validators.required]],
      cre_days: ["0", [Validators.required]],
      cre_daily_quota: ["0", [Validators.required]],
      cre_tax_amount: ["0", [Validators.required]],
      cre_brut_amount: ["0", [Validators.required]],
    });
    this.submitted = false;
  }
  get formi() {
    return this.formCredit.controls;
  }
  sendEmployeeDiscount() {
  }

  employyes: Client[] = [];
  getAllClients() {
    this.loading = true;
    this.serviceClients.getAll().subscribe({
      next: (value: GirosResponse) => {
        this.employyes = value.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  taxses: any[] = [];
  getTaxse() {
    this.loading = true;
    this.service.getTaxse().subscribe({
      next: (value: any) => {
        this.taxses = value.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  keyword = 'cli_full_name';

  employeeSelected: Client | null = null;
  selectEvent(item) {
    // do something with selected item
    console.log("selectEvent")
    if (item.cli_code != null) {
      console.log("selectEven dentroooo")
      this.employeeSelected = item;

      this.formCredit.patchValue({
        cli_code: item.cli_code,
      });
    }
    console.log(item)
  }

  onChangeSearch(val: string) {
    console.log("onChangeSearch")
    console.log(val)
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    console.log("onChangeSearch")
    console.log(this.employyes)
    console.log(e)
    // do something when input is focused
  }

  calculateMount() {
    const monto = Number(this.formi['cre_neto_amount'].value);
    const per_code = this.formi['per_code'].value;
    const percent = this.taxses.filter(e => e.per_code == per_code);
    if (percent.length > 0 && monto > 0) {
      const percentdta = percent[0];
      const montoTotal = monto * ((percentdta.per_rate / 100) + 1)
      const tax = monto * ((percentdta.per_rate / 100))
      this.formCredit.patchValue({
        cre_days: percentdta.per_days,
        cre_daily_quota: this.redondearDecimales(montoTotal / percentdta.per_days),
        cre_tax_amount: this.redondearDecimales(tax),
        cre_brut_amount: this.redondearDecimales(montoTotal),
      });
    }

  }
  redondearDecimales(numero, decimales = 2) {
    const numeroRegexp = new RegExp('\\d\\.(\\d){' + decimales + ',}');   // Expresion regular para numeros con un cierto numero de decimales o mas
    if (numeroRegexp.test(numero)) {         // Ya que el numero tiene el numero de decimales requeridos o mas, se realiza el redondeo
      return Number(numero.toFixed(decimales));
    } else {
      return Number(numero.toFixed(decimales)) === 0 ? 0 : numero;  // En valores muy bajos, se comprueba si el numero es 0 (con el redondeo deseado), si no lo es se devuelve el numero otra vez.
    }
  }

  createCRedits() {


    this.submitted = true;
    if (this.formCredit.valid) {
      const id_client = this.employeeSelected?.cli_code ?? '';
      if (id_client.length < 8) {
        Swal.fire({
          title: "Error",
          text: "Selecciona un cliente valido!",
          showConfirmButton: true,
          icon: "error",
        });
        return;
      }
      const monto = Number(this.formi['cre_neto_amount'].value);
      if (monto == 0) {
        Swal.fire({
          title: "Error",
          text: "Ingrese un monto valido valido!",
          showConfirmButton: true,
          icon: "error",
        });
        return;
      }
      this.loading = true;
      const data = {
        cre_days: this.formi['cre_days'].value,
        cre_daily_quota: this.formi['cre_daily_quota'].value,
        cre_neto_amount: this.formi['cre_neto_amount'].value,
        cre_tax_amount: this.formi['cre_tax_amount'].value,
        cre_brut_amount: this.formi['cre_brut_amount'].value,
        cli_code: id_client,
        per_code: this.formi['per_code'].value,
        cre_date_start: this.formi['cre_date_start'].value
      }
      this.service.create(data).subscribe({
        next: (resp: any) => {
          if (resp.data.cli_code != null) {
            Swal.fire({
              title: "success",
              text: "Credito creado con exito!",
              showConfirmButton: true,
              icon: "success",
            });
            this.clearFormDiscount();
            this.loading = false;

          } else {

            this.loading = false;
            Swal.fire({
              title: "Error",
              text: "Ha ocurrido un error intentelo mas tarde!",
              showConfirmButton: true,
              icon: "error",
            });
          }
        }, error: () => {

          Swal.fire({
            title: "Error",
            text: "Ha ocurrido un error intentelo mas tarde!",
            showConfirmButton: true,
            icon: "error",
          });
        }
      });
    }
  }
}
