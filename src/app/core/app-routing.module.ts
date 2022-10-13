import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../feature/login/login.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard], // AUTH GUARD IS GREAT
    loadChildren: () =>
      import('../feature/feature.module').then((m) => m.FeatureModule),
  },
  {
    path: 'profile',
    // canActivate: [AuthGuard], // AUTH GUARD IS GREAT
    loadChildren: () =>
      import('../feature/profile/profile.module').then((m) => m.ProfileModule),
  },
  // {
  //   path: '',
  //   // canActivate: [AuthGuard], // AUTH GUARD IS GREAT
  //   loadChildren: () =>
  //     import('../feature/main/main/main.module').then((m) => m.MainModule),
  // },
  // {
  //   path: 'home',
  //   // canActivate: [AuthGuard], // AUTH GUARD IS GREAT
  //   loadChildren: () =>
  //     import('../feature/main/main/main.module').then((m) => m.MainModule),
  // },
  // // { path: '**', redirectTo: 'home' },
  // {
  //   path: 'seller',
  //   loadChildren: () =>
  //     import('../feature/seller/seller/seller.module').then((m) => m.SellerModule),
  // },
  // {
  //   path: 'buyer',
  //   loadChildren: () =>
  //     import('../feature/buyer/buyer/buyer.module').then((m) => m.BuyerModule),
  // },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
