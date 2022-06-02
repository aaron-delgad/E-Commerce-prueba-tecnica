import { Component, OnInit } from '@angular/core';
import {CartService} from "../../shared/service/cart.service";
import {Product} from "../../shared/model/base/product";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmModalComponent} from "./components/confirm-modal/confirm-modal.component";
import {Router} from "@angular/router";
import {menuConst} from "../../setting/constants/menu.constant";

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

  constructor(private readonly cartService: CartService,
              public dialog: MatDialog,
              private readonly router: Router,) {  }

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
    const dialog = this.dialog.open(ConfirmModalComponent, {
      width: '400px', data: {state: 'Compra Realizada Satisfactoriamente'}
    });
    dialog.afterClosed().subscribe(result => {
          this.router.navigate([menuConst.productList.fullPath]);
    });
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
