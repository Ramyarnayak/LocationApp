import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingMallPage } from './shopping-mall.page';

const routes: Routes = [
  {
    path: '',
    component: ShoppingMallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingMallPageRoutingModule {}
