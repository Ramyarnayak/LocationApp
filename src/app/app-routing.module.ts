import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthPageModule) },
  {
    path: 'places',
    loadChildren: () => import('./places/places.module').then(m => m.PlacesPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'bookings',
    loadChildren: () => import('./bookings/bookings.module').then(m => m.BookingsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'places/tabs/search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'places/tabs/search/hospital',
    loadChildren: () => import('./search/hospital/hospital.module').then( m => m.HospitalPageModule)
    ,canLoad: [AuthGuard]
  },
  {
    path: 'places/tabs/search/gym',
    loadChildren: () => import('./search/gym/gym.module').then( m => m.GymPageModule)
    ,canLoad: [AuthGuard]
  },
  {
    path: 'places/tabs/search/for-weeekend',
    loadChildren: () => import('./search/for-weekend/for-weekend.module').then( m => m.ForWeekendPageModule)
    ,canLoad: [AuthGuard]
  },
  {
    path: 'places/tabs/search/atm',
    loadChildren: () => import('./atm/atm.module').then( m => m.AtmPageModule)
    ,canLoad: [AuthGuard]
  },
  {
    path: 'places/tabs/search/zoo',
    loadChildren: () => import('./search/zoo/zoo.module').then( m => m.ZooPageModule)
    ,canLoad: [AuthGuard]
  },
  {
    path: 'places/tabs/search/library',
    loadChildren: () => import('./search/library/library.module').then( m => m.LibraryPageModule)
    ,canLoad: [AuthGuard]
  },
  {
    path: 'places/tabs/search/shopping-mall',
    loadChildren: () => import('./search/shopping-mall/shopping-mall.module').then( m => m.ShoppingMallPageModule)
    ,canLoad: [AuthGuard]
  },
  {
    path: 'places/tabs/search/police-station',
    loadChildren: () => import('./search/police-station/police-station.module').then( m => m.PoliceStationPageModule)
    ,canLoad: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
