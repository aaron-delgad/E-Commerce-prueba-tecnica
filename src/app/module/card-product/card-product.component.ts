import { Component, OnInit } from '@angular/core';
import {CartService} from "../../shared/service/cart.service";
import {Product} from "../../shared/model/base/product";
import {FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'com-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss']
})
export class CardProductComponent implements OnInit {

  cartProducts: Product[] = [
    {}
  ];
  form: FormGroup;

  constructor(private readonly cartService: CartService) { this.formBuild();}

  ngOnInit(): void {
    this.cartService.myCart$.subscribe(produ => {
      this.cartProducts = produ;
      console.log(this.cartProducts);
    });
  }

  formBuild(){
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      subtotal: new FormControl('', [Validators.required]),
      send: new FormControl('', [Validators.required]),
      total: new FormControl('', [Validators.required])
    })
  }

}
