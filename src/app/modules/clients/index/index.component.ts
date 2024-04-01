import { Component, OnInit } from '@angular/core';


import { Client, GirosResponse } from '../interfaces/client-response.interface';
import { ClientsService } from 'src/app/shared/services';
const Swal = require('sweetalert2')
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styles: ``
})
export class IndexComponent implements OnInit {
  employyes: Client[] = [];
  employyesFilter: Client[] = [];
  loading: Boolean = false;
  constructor(
    private service: ClientsService,
  ) {
  }
  ngOnInit(): void {
    this.getAllClients();
  }
  buscarCliente(termino: any) {
    let busqueda = termino.target.value;
    if (busqueda == null || busqueda.length == 0) {
      this.employyes = this.employyesFilter;
    } else {
      this.employyes = this.employyesFilter.filter(e => (
        e.cli_full_name.toLowerCase().includes(busqueda.toLowerCase())
      ));
    }
  }


  getAllClients() {
    this.loading = true;
    this.service.getAll().subscribe({
      next: (value: GirosResponse) => {
        this.employyes = value.data;
        this.employyesFilter = value.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }


  deleteClient(id_: any) {
    const data = this.employyes.filter((e: any) => e.cli_code == id_)[0];
    const client = data.cli_full_name
    Swal.fire({
      title: "¿Está seguro?",
      text: `Estas por eliminar: ${client}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#364574",
      cancelButtonColor: "rgb(243, 78, 78)",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "No, Cancelar!",
    }).then((result) => {
      if (result.value) {
        this.service.delete(id_).subscribe({
          next: (resp) => {
            var r: any = resp;
            if (r.status) {
              this.getAllClients();
              Swal.fire({
                type: 'success',
                title: 'Exito',
                text: 'Cliente eliminado con exito!',
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
