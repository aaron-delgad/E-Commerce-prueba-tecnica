import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { CardProductRouting } from './card-product.routing';
import {CardProductComponent} from "./card-product.component";


@NgModule({
  declarations: [
    CardProductComponent
  ],
  imports: [
    CommonModule,
    CardProductRouting,
    MatListModule
  ]
})
export class CardProductModule { }
