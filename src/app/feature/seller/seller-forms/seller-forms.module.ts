import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

import { SellerFormsRoutingModule } from './seller-forms-routing.module';
import { SellerFormsComponent } from './seller-forms.component';
import { SellOutComponent } from './sell-out/sell-out.component';
import { SellerInvestmentComponent } from './seller-investment/seller-investment.component';
import { SellMergersAcquisitionsComponent } from './sell-mergers-acquisitions/sell-mergers-acquisitions.component';
import { SellCommercialPropertyComponent } from './sell-commercial-property/sell-commercial-property.component';
import { SellerSubsectorsComponent } from './subsectors/subsectors.component';


@NgModule({
  declarations: [
    SellerFormsComponent,
    SellOutComponent,
    SellerInvestmentComponent,
    SellMergersAcquisitionsComponent,
    SellCommercialPropertyComponent,
    SellerSubsectorsComponent
  ],
  imports: [
    CommonModule,
    SellerFormsRoutingModule,
    NgSelectModule,
    FormsModule,
    NgxSliderModule,
    ReactiveFormsModule
  ]
})
export class SellerFormsModule { }
