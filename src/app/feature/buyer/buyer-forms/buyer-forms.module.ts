import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BuyerFormsRoutingModule } from './buyer-forms-routing.module';
import { BuyOutComponent } from './buy-out/buy-out.component';
import { BuyerFormsComponent } from './buyer-forms.component';
import { InvestmentComponent } from './investment/investment.component';
import { CommercialPropertyComponent } from './commercial-property/commercial-property.component';
import { MergersAcquisitionsComponent } from './mergers-acquisitions/mergers-acquisitions.component';
import { BuyerSubsectorsComponent } from './subsectors/subsectors.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    BuyOutComponent,
    BuyerFormsComponent,
    InvestmentComponent,
    CommercialPropertyComponent,
    MergersAcquisitionsComponent,
    BuyerSubsectorsComponent
  ],
  imports: [
    CommonModule,
    BuyerFormsRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class BuyerFormsModule { }
