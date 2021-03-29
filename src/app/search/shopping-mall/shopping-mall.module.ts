import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShoppingMallPageRoutingModule } from './shopping-mall-routing.module';

import { ShoppingMallPage } from './shopping-mall.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShoppingMallPageRoutingModule
  ],
  declarations: [ShoppingMallPage]
})
export class ShoppingMallPageModule {}
