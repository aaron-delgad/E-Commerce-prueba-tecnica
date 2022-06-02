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

  cantidad = new FormControl('', [Validators.required]);

  cartProducts: Product[] = [
    {
      id: '1',
      name: 'Trolardy 2. Trolardy y el misterio de Tutankarbón',
      sku: 9786124461156,
      price: 89.900000000000005684341886080801486968994140625,
      description: 'Trolardy 2. Trolardy y el misterio de Tutankarbón',
      image: 'https://chanchitoy.pruebasgt.com/wp-content/uploads/2022/02/portada_trolardy-2-trolardy-y-el-misterio-de-tutankarbon_trolerotutos-y-hardy_202111291055-196x300.jpg'
    },
    {
      id: '2',
      name: "Los Compas y La Entidad.EXE",
      sku: 9786124461132,
      price: 79.9899999999999948840923025272786617279052734375,
      description: "Los Compas y La Entidad.EXE",
      image: "https://chanchitoy.pruebasgt.com/wp-content/uploads/2021/11/los-compas-y-la-entidadexe-196x300.jpg"
    },
    {
      id: '3',
      name: "Trolardy y el pan dorado",
      sku: 9786124461088,
      price: 59.99000000000000198951966012828052043914794921875,
      description: "Trolardy y el pan dorado",
      image: "https://chanchitoy.pruebasgt.com/wp-content/uploads/2021/10/331553_portada_trolardy-y-el-pan-dorado_trolerotutos-y-hardy_202012230945-195x300.jpg"
    }
  ];
  form: FormGroup;

  constructor(private readonly cartService: CartService) { this.formBuild();}

  ngOnInit(): void {
    this.cantidad.setValue('1');
    /*this.cartService.myCart$.subscribe(produ => {
      this.cartProducts = produ;
      console.log(this.cartProducts);
    });*/
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
