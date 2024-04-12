import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CreditsService {
  endpoint: String = environment.API_URL + "v1/credits";
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

  delete(id: any) {
    return this.http.delete(`${this.endpoint}/${id}`);
  }
  getTaxse() {
    return this.http.get(`${this.endpoint}/taxse`);
  }
}
