import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyerComponent } from './buyer.component';
import { BuyerRoutingModule } from './buyer-routing.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    BuyerComponent,
  ],
  imports: [
    CommonModule,
    BuyerRoutingModule,
    SlickCarouselModule,
    SharedModule
  ]
})
export class BuyerModule { }
