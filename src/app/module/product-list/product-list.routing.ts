import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { menuConst } from './../../setting/constants/menu.constant';
import { ProductListComponent } from './product-list.component';

const routes: Routes = [
  {
    path: menuConst.clean,
    component: ProductListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductListRoutingModule { }
