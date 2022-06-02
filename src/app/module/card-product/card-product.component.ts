import { Component, OnInit } from '@angular/core';
import {CartService} from "../../shared/service/cart.service";
import {Product} from "../../shared/model/base/product";

@Component({
  selector: 'com-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss']
})
export class CardProductComponent implements OnInit {

  cartProducts: Product[] = [];

  constructor(private readonly cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.myCart$.subscribe(produ => {
      this.cartProducts = produ;
      console.log(this.cartProducts);
    });
  }

}
