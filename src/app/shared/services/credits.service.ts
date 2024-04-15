import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CreditsService {
  endpoint: String = environment.API_URL + "v1/credits";
  endpointReposrt: String = environment.API_URL + "v1/pdf-reports";
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get(`${this.endpoint}`);
  }
  getOne(id: any) {
    return this.http.get(`${this.endpoint}/${id}`);
  }
  create(data: any,) {
    return this.http.post(`${this.endpoint}`, data);
  }
  generarAbono(data: any,) {
    return this.http.post(`${this.endpoint}/generar-abono`, data);
  }
  generarPdfReports(id: any,) {
    return this.http.get(`${this.endpointReposrt}/generar-pagare/${id}`);
  }

  delete(id: any) {
    return this.http.delete(`${this.endpoint}/${id}`);
  }
  getTaxse() {
    return this.http.get(`${this.endpoint}/taxse`);
  }
  getAllDues(data: any) {
    return this.http.post(`${this.endpoint}/dues`, data);
  }
}
