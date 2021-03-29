import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForWeekendPage } from './for-weekend.page';

const routes: Routes = [
  {
    path: '',
    component: ForWeekendPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForWeekendPageRoutingModule {}
