import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerComponent } from './seller.component';
import { SellerRoutingModule } from './seller-routing.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormService } from 'src/app/shared/services/forms/form-seller.service';



@NgModule({
  declarations: [
    SellerComponent
  ],
  imports: [
    CommonModule,
    SellerRoutingModule,
    SlickCarouselModule,
    SharedModule
  ],
  providers:[FormService]
})
export class SellerModule { }
