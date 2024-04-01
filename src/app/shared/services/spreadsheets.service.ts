import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SpreadsheetsService {
  endpoint: String = environment.API_URL + "v1/spreadsheets";
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get(`${this.endpoint}`);
  }
  getOne(id: any) {
    return this.http.get(`${this.endpoint}/${id}`);
  }
  create(data: any, id: string) {
    if (id.length > 10) {
      return this.http.put(`${this.endpoint}/${id}`, data);
    } else {
      return this.http.post(`${this.endpoint}`, data);
    }
  }
  delete(id: any) {
    return this.http.delete(`${this.endpoint}/${id}`);
  }
  getCatalogs() {
    return this.http.get(`${this.endpoint}/get/catalogs`);
  }
}
