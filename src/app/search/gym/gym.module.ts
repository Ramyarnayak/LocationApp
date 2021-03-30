import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GymPageRoutingModule } from './gym-routing.module';

import { GymPage } from './gym.page';
import { HintModalPageModule } from '../hint-modal/hint-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GymPageRoutingModule,
    HintModalPageModule
  ],
  declarations: [GymPage]
})
export class GymPageModule {}
