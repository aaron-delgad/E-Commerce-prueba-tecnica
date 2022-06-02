import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {menuConst} from "../../setting/constants/menu.constant";
import {CardProductComponent} from "./card-product.component";

const routes: Routes = [
  {
    path: menuConst.clean,
    component: CardProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardProductRouting { }
