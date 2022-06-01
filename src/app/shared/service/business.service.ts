import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  urlBase = environment.urlBase;
  urlSearchProduct = this.urlBase + environment.apis.searchProduct;

  constructor(private readonly http: HttpClient) { }

  getProduct() {
    return this.http.get(`${this.urlSearchProduct}`)
    .pipe(map((resp :any) => resp.data));
  }
}
