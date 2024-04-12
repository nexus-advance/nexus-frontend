import { Component } from "@angular/core";
import { CreditsService } from "src/app/shared/services";
const Swal = require('sweetalert2')

@Component({
  selector: "app-actives",
  templateUrl: "./actives.component.html",
  styles: ``,
})
export class ActivesComponent {
  loading: boolean = false;
  employyes: any[] = [];

  constructor(
    private service: CreditsService,
  ) {
    this.getAll();
  }

  credits: any[] = []
  getAll() {
    this.loading = true;
    this.service.getAll().subscribe({
      next: (resp: any) => {
        this.credits = resp.data;
        this.loading = false;
        this.credits.map(e => {
          e.abonado = 0;
          for (const iterator of e.nex_abo_abonos) {
            e.abonado = e.abonado + iterator.abo_cuota;
          }
          return e;
        });
      },
      error: (resp: any) => {
        this.loading = false;
      },
    });
  }

  buscarCliente(termino: any) {
    let busqueda = termino.target.value;
    if (busqueda == null || busqueda.length == 0) {
      this.employyes = this.credits;
    } else {
      this.employyes = this.credits.filter(e => (
        e.nex_cli_clients.cli_full_name.toLowerCase().includes(busqueda.toLowerCase())
      ));
    }
  }

  mostrarDialogo(cre_code): void {
    const data = this.credits.filter(e => e.cre_code == cre_code);
    if (data.length == 0) return;
    const client = data[0];
    Swal.fire({
      title: 'Abonar a la cuenta de ' + client.nex_cli_clients.cli_full_name,
      input: 'number',  // Establece el tipo de input que deseas usar
      inputPlaceholder: 'Ingrese el monto a abonae', // Placeholder para el input
      showCancelButton: true,  // Muestra un botón para cancelar
      confirmButtonText: 'Abonar',
      cancelButtonText: 'Cancelar',
      loading: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Debe ser un monto mayor a 0!'
        }
      }
    }).then((resultado) => {
      if (resultado.value) {
        const data = {
          amount: Number(resultado.value),
          cre_code: cre_code
        }

        this.loading = true;
        this.service.generarAbono(data).subscribe({
          next: (resp: any) => {
            this.loading = false;
            if (resp.data.abo_code != null) {
              Swal.fire({
                title: "success",
                text: "Abono realizado con exito!",
                showConfirmButton: true,
                icon: "success",
              });
              this.getAll();
            } else {
              Swal.fire({
                title: "Error",
                text: "Ha ocurrido un error intentelo mas tarde!",
                showConfirmButton: true,
                icon: "error",
              });
            }
          },
          error: (resp: any) => {
            this.loading = false;
            Swal.fire({
              title: "Error",
              text: "Ha ocurrido un error intentelo mas tarde!",
              showConfirmButton: true,
              icon: "error",
            });
          },
        });
      }
    });
  }
}
