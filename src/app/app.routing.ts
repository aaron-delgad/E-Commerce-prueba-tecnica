import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { menuConst } from './setting/constants/menu.constant';

const routes: Routes = [
  {
    path: menuConst.clean, redirectTo: menuConst.productList.path, pathMatch: 'full',
  },
  {
    path: menuConst.productList.path,
    loadChildren: () => import('./module/product-list/product-list.module').then(m => m.ProductListModule)
  },
  {
    path: menuConst.cartproduct.path,
    loadChildren: () => import('./module/card-product/card-product.module').then(m => m.CardProductModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting { }
