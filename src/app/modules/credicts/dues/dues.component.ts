import { Component } from '@angular/core';
import { CreditsService } from 'src/app/shared/services';
// const Swal = require('sweetalert2')

@Component({
  selector: 'app-dues',
  templateUrl: './dues.component.html',
  styles: ``
})
export class DuesComponent {
  loading: boolean = false;
  dues: any[] = [];

  date: any = '';
  constructor(
    private service: CreditsService,
  ) {
    const newDate = new Date();
    const m = newDate.getMonth() + 1;
    const month = m > 9 ? m : "0" + m;
    this.date = newDate.getFullYear() + "-" + month + "-" + newDate.getDate();
    this.getAllDues();
  }
  sales = {
    icon: "tag",
    counter: "4,200",
    name: "En credito",
    font: "primary",
    pr: "100",
  };
  purchaseRate = {
    icon: "rate",
    counter: "5700",
    name: "No recuperado",
    font: "success",
    pr: "+70",
  };

  purchase = {
    icon: "cart",
    counter: "10,000",
    name: "Recuperado",
    font: "secondary",
    pr: "-20",
  };

  credits: any[] = []
  getAllDues() {
    this.loading = true;
    const data = {
      date: this.date
    }
    this.service.getAllDues(data).subscribe({
      next: (resp: any) => {
        this.dues = resp.data.cuotas;
        this.credits = resp.data.cuotas;
        this.sales.counter = "$ " + Number(resp.data.credits).toFixed(2);
        this.loading = false;
        let cuotas = 0;
        this.dues.map(e => {
          cuotas += e.abo_cuota;
          return e;
        });
        this.purchaseRate.counter = "$ " + Number(cuotas).toFixed(2);
        this.purchase.counter = "$ " + Number(resp.data.credits - cuotas).toFixed(2);
      },
      error: (resp: any) => {
        this.loading = false;
      },
    });
  }

  buscarCliente(termino: any) {
    let busqueda = termino.target.value;
    if (busqueda == null || busqueda.length == 0) {
      this.dues = this.credits;
    } else {
      this.dues = this.credits.filter(e => (
        e.nex_cre_credits.nex_cli_clients.cli_full_name.toLowerCase().includes(busqueda.toLowerCase())
      ));
    }
  }

}
