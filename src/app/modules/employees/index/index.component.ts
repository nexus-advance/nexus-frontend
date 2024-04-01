import { Component, OnInit } from '@angular/core';

import {
  EmployesService
} from "src/app/shared/services";

import { Employee, EmployesInterface } from '../interfaces/employes_response.interface';
const Swal = require('sweetalert2')
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styles: ``
})
export class IndexComponent implements OnInit {
  employyes: Employee[] = [];
  employyesFilter: Employee[] = [];
  loading: Boolean = false;
  constructor(
    private service: EmployesService,
  ) {
  }
  ngOnInit(): void {
    this.getAllEmployees();
  }
  buscarEmpleado(termino: any) {
    let busqueda = termino.target.value;
    if (busqueda == null || busqueda.length == 0) {
      this.employyes = this.employyesFilter;
    } else {
      this.employyes = this.employyesFilter.filter(e => (
        e.emp_first_name.toLowerCase().includes(busqueda.toLowerCase()) ||
        e.emp_second_name.toLowerCase().includes(busqueda.toLowerCase()) ||
        e.emp_third_name.toLowerCase().includes(busqueda.toLowerCase()) ||
        e.emp_second_surname.toLowerCase().includes(busqueda.toLowerCase()) ||
        e.emp_first_surname.toLowerCase().includes(busqueda.toLowerCase()) ||
        e.emp_married_surname.toLowerCase().includes(busqueda.toLowerCase())
      ));
    }
  }


  getAllEmployees() {
    this.loading = true;
    this.service.getAll().subscribe({
      next: (value: EmployesInterface) => {
        this.employyes = value.data;
        this.employyesFilter = value.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }


  deleteEmployee(id_: any) {
    let data = this.employyes.filter((e: any) => e.emp_code == id_)[0];
    let employee = data.emp_first_name + ' ' + data.emp_second_name + ' ' + data.emp_third_name + ' ' + data.emp_first_surname + ' ' + data.emp_second_surname + ' ' + data.emp_married_surname
    Swal.fire({
      title: "¿Está seguro?",
      text: `Estas por eliminar: ${employee}`,
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
              this.getAllEmployees();

              Swal.fire({
                type: 'success',
                title: 'Exito',
                text: 'Empleado eliminado con exito!',
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
