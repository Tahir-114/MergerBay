import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyerFormsComponent } from './buyer-forms.component';

const routes: Routes = [
  {
    path: '',
    component: BuyerFormsComponent,
  },
  {
    path: 'buy-out',
    component: BuyerFormsComponent
  },
  {
    path: 'investment',
    component: BuyerFormsComponent
  },
  {
    path: 'mergers-acquisitions',
    component: BuyerFormsComponent
  },
  {
    path: 'commercial-property',
    component: BuyerFormsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerFormsRoutingModule { }
