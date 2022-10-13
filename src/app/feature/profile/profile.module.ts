import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

import { ProfileRoutingModule } from './profile-routing.module';
import { PropositionsComponent } from './propositions/propositions.component';
import { PersonalCompanyInfoComponent } from './personal-company-info/personal-company-info.component';
import { SettingsComponent } from './settings/settings.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PropotionReviewComponent } from './propotion-review/propotion-review.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PropositionsComponent,
    PersonalCompanyInfoComponent,
    SettingsComponent,
    EditProfileComponent,
    PropotionReviewComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SlickCarouselModule,
    NgSelectModule,
    FormsModule,
    SharedModule
  ]
})
export class ProfileModule { }
