import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/forms/form-seller.service';
import { UserAuthService } from 'src/app/shared/services/user/user.auth';

@Component({
  selector: 'app-personal-company-info',
  templateUrl: './personal-company-info.component.html',
  styleUrls: ['./personal-company-info.component.css']
})
export class PersonalCompanyInfoComponent implements OnInit {
  profileForm:FormGroup;
  companyInformationForm:FormGroup;
  cardAttachmentURLs:any[];
  certificateAttachmentURLs:any[];
  profileImageURL:string='';
  constructor(private form: FormService,private userAuth:UserAuthService, private router: Router) { 
this.cardAttachmentURLs=[];
this.certificateAttachmentURLs=[];
  }

  ngOnInit(): void {
    this.profileForm=this.form.iniProfileForm();
    this.companyInformationForm=this.form.iniCompanyInformationForm();
    this.getProfile();
    this.getCompanyInformation();
  }

  getProfile()
  {
    this.profileForm.reset();
    debugger;
    const body={
      user_Id:localStorage.getItem('userId')
    }
    this.userAuth
    .getUserProfile(body)
    .subscribe(
      (data:any) => {
       console.log(data[0]);
      this.profileForm.patchValue(data[0]);
       this.profileImageURL=data[0]['profilePictureList'];
      },
      (error) => {
      }
    );  
  }

  get f() {
    return this.profileForm.controls;
  }
  get name() { return this.profileForm.get('firstName'); }
  get lastName() { return this.profileForm.get('lastName'); }
  get email() { return this.profileForm.get('email'); }
  get country() { return this.profileForm.get('country'); }
  get phone() { return this.profileForm.get('phone'); }
  get location() { return this.profileForm.get('location'); }
  get company() { return this.companyInformationForm.get('company'); }
  get website() { return this.companyInformationForm.get('website'); }
  get designation() { return this.companyInformationForm.get('designation'); }
  get category() { return this.companyInformationForm.get('category'); }

  getCompanyInformation()
  {
    const body={
      user_Id:localStorage.getItem('userId')
    }
    debugger;
    this.userAuth
    .getCompanyInformation(body)
    .subscribe(
      (data:any) => {
        console.log(data[0]);
        this.companyInformationForm.patchValue(data[0]);
        this.category?.patchValue(data[0].categoryList);
        this.cardAttachmentURLs=data[0]['cardAttachment'];
        // this.category_list=data[0]['categoryList'];
         this.certificateAttachmentURLs=data[0]['certificateAttachment'];
      },
      (error) => {
      }
    );  
  }
}
