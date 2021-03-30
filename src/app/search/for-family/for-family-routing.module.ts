import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForFamilyPage } from './for-family.page';

const routes: Routes = [
  {
    path: '',
    component: ForFamilyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForFamilyPageRoutingModule {}
