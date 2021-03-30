import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AtmPageRoutingModule } from './atm-routing.module';

import { AtmPage } from './atm.page';
import { HintModalPageModule } from '../search/hint-modal/hint-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AtmPageRoutingModule,
    HintModalPageModule


  ],
  declarations: [AtmPage]
})
export class AtmPageModule {}
