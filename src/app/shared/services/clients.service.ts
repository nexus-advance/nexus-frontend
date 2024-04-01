import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  endpoint: String = environment.API_URL + "v1/clients";
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get(`${this.endpoint}`);
  }
  getOne(id: any) {
    return this.http.get(`${this.endpoint}/${id}`);
  }
  getDiscounts(id: any) {
    return this.http.get(`${this.endpoint}/get/discountss/${id}`);
  }
  create(data: any, id: string) {
    if (id.length > 10) {
      return this.http.put(`${this.endpoint}/${id}`, data);
    } else {
      return this.http.post(`${this.endpoint}`, data);
    }
  }

  create_discount(data: any) {
    return this.http.post(`${this.endpoint}/discounts`, data);
  }
  deleteDiscount(id: any) {
    return this.http.delete(`${this.endpoint}/discounts/${id}`);
  }
  delete(id: any) {
    return this.http.delete(`${this.endpoint}/${id}`);
  }
  updatePrincipal(id: any) {
    return this.http.get(`${this.endpoint}/asignar_principal/${id}`);
  }
  getCatalogs() {
    return this.http.get(`${this.endpoint}/get/catalogs`);
  }
}
