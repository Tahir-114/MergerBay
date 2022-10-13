import { ErrorInterceptor } from './intercepter/error.interceptor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginRegisterMessageComponent } from './login-register-message/login-register-message.component';
import { LoadingInterceptor } from './intercepter/loading.interceptor';
import { BuyFeaturedDealsComponent } from '../feature/buyer/buyer/featured-deals/featured-deals.component';
import { SellFeaturedDealsComponent } from '../feature/seller/seller/featured-deals/featured-deals.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { TimeAgoPipe } from './Pipes/timeago.pipe';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginRegisterMessageComponent,
    BuyFeaturedDealsComponent,
    SellFeaturedDealsComponent,
    TimeAgoPipe,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    HttpClientModule,
    SlickCarouselModule,
    ReactiveFormsModule 
  ],
  exports: [HeaderComponent, 
      FooterComponent,
      ReactiveFormsModule,
      LoginRegisterMessageComponent, 
      BuyFeaturedDealsComponent,
      SellFeaturedDealsComponent,
      TimeAgoPipe,    
    ],
  providers:[
    HttpClientModule,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
  ]
})
export class SharedModule { }
