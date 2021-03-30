import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HintModalPage } from './hint-modal.page';

const routes: Routes = [
  {
    path: '',
    component: HintModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HintModalPageRoutingModule {}
