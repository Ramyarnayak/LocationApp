import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyTripPageRoutingModule } from './my-trip-routing.module';

import { MyTripPage } from './my-trip.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyTripPageRoutingModule
  ],
  declarations: [MyTripPage]
})
export class MyTripPageModule {}
