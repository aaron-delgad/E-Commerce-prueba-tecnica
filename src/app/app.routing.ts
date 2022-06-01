import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { menuConst } from './setting/constants/menu.constant';

const routes: Routes = [
  {
    path: menuConst.clean, redirectTo: menuConst.productList, pathMatch: 'full',
  },
  {
    path: menuConst.productList,
    loadChildren: () => import('./module/product-list/product-list.module').then(m => m.ProductListModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting { }
