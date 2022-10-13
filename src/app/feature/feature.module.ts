import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureRoutingModule } from './feature-routing.module';
import { LoginComponent } from './login/login.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    NgSelectModule,
    FormsModule,
    SharedModule,
    SlickCarouselModule,
    ReactiveFormsModule
  ],

})
export class FeatureModule { }
