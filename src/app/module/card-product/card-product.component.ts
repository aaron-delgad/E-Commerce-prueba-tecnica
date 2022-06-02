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
  cantidad1: number =1;
  cantidad = new FormControl(this.cantidad1, [Validators.required]);


  subtotal: number =0;
  send: number = 6;
  total: number = 0;

  cartProducts: any[] = [];
  form: FormGroup;

  constructor(private readonly cartService: CartService) {  }

  ngOnInit(): void {
    this.cartService.myCart$.subscribe(produ => {
      this.cartProducts = produ;
      this.calcularTotal();
    });
  }

  calcularTotal() {
    this.subtotal = this.cartProducts.reduce(function(totalActual, Product){
      return (Product.price * Product.cant) + totalActual;
    }, 0);
    this.total = this.subtotal + this.send;
    this.formBuild();
  }

  formBuild(){
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      subtotal: new FormControl(this.subtotal, [Validators.required]),
      send: new FormControl(this.send, [Validators.required]),
      total: new FormControl(this.total, [Validators.required])
    })
  }

  calculateOrder(productID: number) {
    this.cartProducts = this.cartProducts.map(p =>
      p.sku === productID
        ? { ...p, cant: this.cantidad.value }
        : p
    );
    this.calcularTotal();
  }

  tobuy() {
    
  }

  delete(productID: number) {
    this.cartProducts = this.cartProducts.filter(function(dato){
      if(dato.sku == productID){
        return false;
      }else{
        return true;
      }
    });
    this.calcularTotal();
  }

}
