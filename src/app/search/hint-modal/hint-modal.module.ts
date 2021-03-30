import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HintModalPageRoutingModule } from './hint-modal-routing.module';

import { HintModalPage } from './hint-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HintModalPageRoutingModule
  ],
  declarations: [HintModalPage]
})
export class HintModalPageModule {}
