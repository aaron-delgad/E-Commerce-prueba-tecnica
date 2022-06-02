import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import {Product} from "../model/base/product";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private myShoppingCart: Product[] = [];
  private myCart = new BehaviorSubject<Product[]>([]);

  myCart$ = this.myCart.asObservable();

  constructor() { }

  addProduct(product: Product){
    this.myShoppingCart.push(product);
    this.myCart.next(this.myShoppingCart);
  }

}
