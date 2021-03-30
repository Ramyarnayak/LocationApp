import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { HospitalPageRoutingModule } from './hospital-routing.module';

import { HospitalPage } from './hospital.page';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HintModalPage } from '../hint-modal/hint-modal.page';
import { HintModalPageModule } from '../hint-modal/hint-modal.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HospitalPageRoutingModule,
    SharedModule,
    HintModalPageModule

  ],
  declarations: [HospitalPage,  CreateBookingComponent ],
  entryComponents: [CreateBookingComponent]
})
export class HospitalPageModule {}
