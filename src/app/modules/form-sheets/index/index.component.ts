import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpreadsheetsService } from 'src/app/shared/services';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
})
export class IndexComponent {
  loading: boolean = false;
  planillas: any[] = []
  constructor(
    private services: SpreadsheetsService,
    private modalService: NgbModal
  ) {
    this.getCatalog();
    this.getSpreads();
  }
  months: [] = [];//services
  getCatalog() {
    this.services.getCatalogs().subscribe({
      next: (value) => {
        console.log(value)
      },
    });
  }
  getSpreads() {
    this.services.getAll().subscribe({
      next: (value: any) => {
        this.planillas = value.data;
      },
    });
  }
  openCustomModal(content) {
    this.modalService.open(content);
  }

  deleteEmployee(id: string) {

  }
}
