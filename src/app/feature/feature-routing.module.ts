import { AdminModule } from './admin/admin.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { PersonalCompanyInfoComponent } from './profile/personal-company-info/personal-company-info.component';
import { PropositionsComponent } from './profile/propositions/propositions.component';
import { PropotionReviewComponent } from './profile/propotion-review/propotion-review.component';
import { SettingsComponent } from './profile/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard], // AUTH GUARD IS GREAT
    loadChildren: () =>
      import('../feature/main/main/main.module').then((m) => m.MainModule),
  },
  {
    path: 'home',
    // canActivate: [AuthGuard], // AUTH GUARD IS GREAT
    loadChildren: () =>
      import('../feature/main/main/main.module').then((m) => m.MainModule),
  },
  // { path: '**', redirectTo: 'home' },
  {
    path: 'seller',
    loadChildren: () =>
      import('../feature/seller/seller/seller.module').then((m) => m.SellerModule),
  },
  {
    path: 'seller/seller-form',
    loadChildren: () =>
      import('../feature/seller/seller-forms/seller-forms.module').then((m) => m.SellerFormsModule),
  },
  {
    path: 'buyer',
    loadChildren: () =>
      import('../feature/buyer/buyer/buyer.module').then((m) => m.BuyerModule),
  },
  {
    path: 'buyer/buyer-form',
    loadChildren: () =>
      import('../feature/buyer/buyer-forms/buyer-forms.module').then((m) => m.BuyerFormsModule),
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('../feature/sign-up/sign-up.module').then((m) => m.SignUpModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('../feature/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'propositions',
    component: PropositionsComponent,
  },
  {
    path: 'profile',
    component: PersonalCompanyInfoComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
  },
  {
    path: 'propotion-reivew/:type/:formId',
    component: PropotionReviewComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
