import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import {map, Observable} from 'rxjs';
import {ProductListResponse} from "../model/response/product-list.response";

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  urlBase = environment.urlBase;
  urlSearchProduct = this.urlBase + environment.apis.searchProduct;

  constructor(private readonly http: HttpClient) { }

  getProduct(field: string) :Observable<ProductListResponse>{
    const params = new HttpParams().set('sku', `${field}`);
    return this.http.get(this.urlSearchProduct, {params})
    .pipe(map(resp => ProductListResponse.createFromObject(resp)));
  }
}
