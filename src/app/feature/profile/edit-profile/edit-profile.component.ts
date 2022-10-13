import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { interval, Observable, range, Subscription, zip,timer } from 'rxjs';
import { FormService } from 'src/app/shared/services/forms/form-seller.service';
import { UserAuthService } from 'src/app/shared/services/user/user.auth';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  profileForm:FormGroup;
  companyInformationForm:FormGroup;
  file:any;
  pictureFormData:FormData;
  cardFormData:FormData;
  licenseFormData:FormData;
  submitted:boolean=false;
  categoriesList:any[];
  category_list:any[];
  profileImageURLs:any[];
  cardAttachmentURLs:any[];
  companyCategory:any[];
  blobBaseAddress:string='https://mergerbayblob.blob.core.windows.net/dealroom/';
  profileImageURL:string='';
  source: Observable<number>;
  subscription: Subscription;
  value: number
  certificateAttachmentURLs:any[];
  width : any=0;
  constructor(private form: FormService,private userAuth:UserAuthService, private router: Router) { 
    this.pictureFormData=new FormData();
    this.cardFormData=new FormData();
    this.licenseFormData=new FormData();
    this.categoriesList=[];
    this.category_list=[];
    this.profileImageURLs=[];
    this.cardAttachmentURLs=[];
    this.certificateAttachmentURLs=[];

  }
  bo_country = '';

  ngOnInit(): void {
    this.profileForm=this.form.iniProfileForm();
    this.companyInformationForm=this.form.iniCompanyInformationForm();
    this.getProfile();
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

  runProgressBar(){
    timer(0,100)
    takeWhile(()=>
       this.isWidthWithinLimit()
       )    
  }

  isWidthWithinLimit(){
    if(this.width===100){
      return false;
    }else{
      return true;
    }
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

  getCategory()
  {
    this.profileForm.reset();
    debugger;
    const body={
      user_Id:localStorage.getItem('userId')
    }
    this.userAuth
    .getCategory(body)
    .subscribe(
      (data:any) => {
       console.log(data);
       this.category_list=data;
      },
      (error) => {
      }
    );  
  }

  getCompanyInformation()
  {
    this.getCategory();
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

  selectedCategory(e:any)
  {
    console.log(e);
    this.categoriesList.push(e);
  }

  
  deleteCategory(e:any)
  {
    console.log(e);
    this.categoriesList.splice(e);
  }

  selectProfilePicture(e:any)
  {
    this.pictureFormData.delete;
    this.pictureFormData.append('profile',e.target.files[0]);
    this.userAuth
    .uploadProfilePictures(this.pictureFormData)
    .subscribe(
      (data:any) => {
       console.log(data);
       this.profileImageURL=this.blobBaseAddress+data['fileName'];
      },
      (error) => {
      }
    );  
  }
  selectCard(e:any)
  {
    this.runProgressBar();
    this.cardFormData.delete;
    for(let file of e.target.files)
    {
      this.cardFormData.append('cards',file);
    }
    this.userAuth
    .uploadCardsPictures(this.cardFormData)
    .subscribe(
      (data:any) => {
       console.log(data);
       for(let card of data['fileName'])
       {
        let completeName=this.blobBaseAddress+card;
        this.cardAttachmentURLs.push(completeName);
       }
       this.width=100;
      
      },
      (error) => {
      }
    );  
  
  }

  selectLicense(e:any)
  {
    this.runProgressBar();
    this.licenseFormData.delete;
    for(let file of e.target.files)
    {
      this.licenseFormData.append('certificate',file);
    } 
    this.userAuth
    .uploadCertificatePictures(this.licenseFormData)
    .subscribe(
      (data:any) => {
       console.log(data);
       for(let card of data['fileName'])
       {
        let completeName=this.blobBaseAddress+card;
        this.certificateAttachmentURLs.push(completeName);
       }
       this.width=100;
      },
      (error) => {
      }
    );  
  }

  saveUserProfile = async (): Promise<void> => {
    debugger;
    this.submitted=true;
   if(this.profileForm.invalid)
    {
      return;
    }
    if(this.profileForm.valid)
    {
      debugger;
      let formValues=this.profileForm.value;
      const body = {
        userId:localStorage.getItem('userId'),
        firstName:formValues.firstName,
        lastName:formValues.lastName,
        email:formValues.email,
        country:formValues.country,
        location:formValues.location,
        phone:formValues.phone,
        profilePictureList:this.profileImageURL

     }
   this.userAuth
     .saveUserProfile(body)
     .subscribe(
       (data:any) => {
        console.log(data);
       },
       (error) => {
       }
     );
    }
    }

    saveCompanyInformation = async (): Promise<void> => {
      debugger;
      this.submitted=true;
     if(this.companyInformationForm.invalid)
      {
        return;
      }
      if(this.companyInformationForm.valid)
      {
        let formValues=this.companyInformationForm.value;
        const body = {
          userId:localStorage.getItem('userId'),
          website:formValues.website,
          designation:formValues.designation,
          company:formValues.company,
          categoryListStore:this.categoriesList[0],
          cardAttachment:this.cardAttachmentURLs,
          certificateAttachment:this.certificateAttachmentURLs
       }
     this.userAuth
       .saveCompanyInformation(body)
       .subscribe(
         (data:any) => {
          console.log(data);
         },
         (error) => {
         }
       );
      }
      }
  
  countries_list = [
    { id: 'AF', name: 'Afghanistan' },
    { id: 'AX', name: 'Aland Islands' },
    { id: 'AL', name: 'Albania' },
    { id: 'DZ', name: 'Algeria' },
    { id: 'AS', name: 'American Samoa' },
    { id: 'AD', name: 'Andorra' },
    { id: 'AO', name: 'Angola' },
    { id: 'AI', name: 'Anguilla' },
    { id: 'AQ', name: 'Antarctica' },
    { id: 'AG', name: 'Antigua and Barbuda' },
    { id: 'AR', name: 'Argentina' },
    { id: 'AM', name: 'Armenia' },
    { id: 'AW', name: 'Aruba' },
    { id: 'AU', name: 'Australia' },
    { id: 'AT', name: 'Austria' },
    { id: 'AZ', name: 'Azerbaijan' },
    { id: 'BS', name: 'Bahamas' },
    { id: 'BH', name: 'Bahrain' },
    { id: 'BD', name: 'Bangladesh' },
    { id: 'BB', name: 'Barbados' },
    { id: 'BY', name: 'Belarus' },
    { id: 'BE', name: 'Belgium' },
    { id: 'BZ', name: 'Belize' },
    { id: 'BJ', name: 'Benin' },
    { id: 'BM', name: 'Bermuda' },
    { id: 'BT', name: 'Bhutan' },
    { id: 'BO', name: 'Bolivia' },
    { id: 'BQ', name: 'Bonaire, Sint Eustatius and Saba' },
    { id: 'BA', name: 'Bosnia and Herzegovina' },
    { id: 'BW', name: 'Botswana' },
    { id: 'BV', name: 'Bouvet Island' },
    { id: 'BR', name: 'Brazil' },
    { id: 'IO', name: 'British Indian Ocean Territory' },
    { id: 'BN', name: 'Brunei Darussalam' },
    { id: 'BG', name: 'Bulgaria' },
    { id: 'BF', name: 'Burkina Faso' },
    { id: 'BI', name: 'Burundi' },
    { id: 'KH', name: 'Cambodia' },
    { id: 'CM', name: 'Cameroon' },
    { id: 'CA', name: 'Canada' },
    { id: 'CV', name: 'Cape Verde' },
    { id: 'KY', name: 'Cayman Islands' },
    { id: 'CF', name: 'Central African Republic' },
    { id: 'TD', name: 'Chad' },
    { id: 'CL', name: 'Chile' },
    { id: 'CN', name: 'China' },
    { id: 'CX', name: 'Christmas Island' },
    { id: 'CC', name: 'Cocos (Keeling) Islands' },
    { id: 'CO', name: 'Colombia' },
    { id: 'KM', name: 'Comoros' },
    { id: 'CG', name: 'Congo' },
    { id: 'CD', name: 'Congo, Democratic Republic of the Congo' },
    { id: 'CK', name: 'Cook Islands' },
    { id: 'CR', name: 'Costa Rica' },
    { id: 'CI', name: 'Cote DIvoire' },
    { id: 'HR', name: 'Croatia' },
    { id: 'CU', name: 'Cuba' },
    { id: 'CW', name: 'Curacao' },
    { id: 'CY', name: 'Cyprus' },
    { id: 'CZ', name: 'Czech Republic' },
    { id: 'DK', name: 'Denmark' },
    { id: 'DJ', name: 'Djibouti' },
    { id: 'DM', name: 'Dominica' },
    { id: 'DO', name: 'Dominican Republic' },
    { id: 'EC', name: 'Ecuador' },
    { id: 'EG', name: 'Egypt' },
    { id: 'SV', name: 'El Salvador' },
    { id: 'GQ', name: 'Equatorial Guinea' },
    { id: 'ER', name: 'Eritrea' },
    { id: 'EE', name: 'Estonia' },
    { id: 'ET', name: 'Ethiopia' },
    { id: 'FK', name: 'Falkland Islands (Malvinas)' },
    { id: 'FO', name: 'Faroe Islands' },
    { id: 'FJ', name: 'Fiji' },
    { id: 'FI', name: 'Finland' },
    { id: 'FR', name: 'France' },
    { id: 'GF', name: 'French Guiana' },
    { id: 'PF', name: 'French Polynesia' },
    { id: 'TF', name: 'French Southern Territories' },
    { id: 'GA', name: 'Gabon' },
    { id: 'GM', name: 'Gambia' },
    { id: 'GE', name: 'Georgia' },
    { id: 'DE', name: 'Germany' },
    { id: 'GH', name: 'Ghana' },
    { id: 'GI', name: 'Gibraltar' },
    { id: 'GR', name: 'Greece' },
    { id: 'GL', name: 'Greenland' },
    { id: 'GD', name: 'Grenada' },
    { id: 'GP', name: 'Guadeloupe' },
    { id: 'GU', name: 'Guam' },
    { id: 'GT', name: 'Guatemala' },
    { id: 'GG', name: 'Guernsey' },
    { id: 'GN', name: 'Guinea' },
    { id: 'GW', name: 'Guinea-Bissau' },
    { id: 'GY', name: 'Guyana' },
    { id: 'HT', name: 'Haiti' },
    { id: 'HM', name: 'Heard Island and Mcdonald Islands' },
    { id: 'VA', name: 'Holy See (Vatican City State)' },
    { id: 'HN', name: 'Honduras' },
    { id: 'HK', name: 'Hong Kong' },
    { id: 'HU', name: 'Hungary' },
    { id: 'IS', name: 'Iceland' },
    { id: 'IN', name: 'India' },
    { id: 'ID', name: 'Indonesia' },
    { id: 'IR', name: 'Iran, Islamic Republic of' },
    { id: 'IQ', name: 'Iraq' },
    { id: 'IE', name: 'Ireland' },
    { id: 'IM', name: 'Isle of Man' },
    { id: 'IL', name: 'Israel' },
    { id: 'IT', name: 'Italy' },
    { id: 'JM', name: 'Jamaica' },
    { id: 'JP', name: 'Japan' },
    { id: 'JE', name: 'Jersey' },
    { id: 'JO', name: 'Jordan' },
    { id: 'KZ', name: 'Kazakhstan' },
    { id: 'KE', name: 'Kenya' },
    { id: 'KI', name: 'Kiribati' },
    { id: 'KP', name: 'Korea, Democratic Peoples Republic of' },
    { id: 'KR', name: 'Korea, Republic of' },
    { id: 'XK', name: 'Kosovo' },
    { id: 'KW', name: 'Kuwait' },
    { id: 'KG', name: 'Kyrgyzstan' },
    { id: 'LA', name: 'Lao Peoples Democratic Republic' },
    { id: 'LV', name: 'Latvia' },
    { id: 'LB', name: 'Lebanon' },
    { id: 'LS', name: 'Lesotho' },
    { id: 'LR', name: 'Liberia' },
    { id: 'LY', name: 'Libyan Arab Jamahiriya' },
    { id: 'LI', name: 'Liechtenstein' },
    { id: 'LT', name: 'Lithuania' },
    { id: 'LU', name: 'Luxembourg' },
    { id: 'MO', name: 'Macao' },
    { id: 'MK', name: 'Macedonia, the Former Yugoslav Republic of' },
    { id: 'MG', name: 'Madagascar' },
    { id: 'MW', name: 'Malawi' },
    { id: 'MY', name: 'Malaysia' },
    { id: 'MV', name: 'Maldives' },
    { id: 'ML', name: 'Mali' },
    { id: 'MT', name: 'Malta' },
    { id: 'MH', name: 'Marshall Islands' },
    { id: 'MQ', name: 'Martinique' },
    { id: 'MR', name: 'Mauritania' },
    { id: 'MU', name: 'Mauritius' },
    { id: 'YT', name: 'Mayotte' },
    { id: 'MX', name: 'Mexico' },
    { id: 'FM', name: 'Micronesia, Federated States of' },
    { id: 'MD', name: 'Moldova, Republic of' },
    { id: 'MC', name: 'Monaco' },
    { id: 'MN', name: 'Mongolia' },
    { id: 'ME', name: 'Montenegro' },
    { id: 'MS', name: 'Montserrat' },
    { id: 'MA', name: 'Morocco' },
    { id: 'MZ', name: 'Mozambique' },
    { id: 'MM', name: 'Myanmar' },
    { id: 'NA', name: 'Namibia' },
    { id: 'NR', name: 'Nauru' },
    { id: 'NP', name: 'Nepal' },
    { id: 'NL', name: 'Netherlands' },
    { id: 'AN', name: 'Netherlands Antilles' },
    { id: 'NC', name: 'New Caledonia' },
    { id: 'NZ', name: 'New Zealand' },
    { id: 'NI', name: 'Nicaragua' },
    { id: 'NE', name: 'Niger' },
    { id: 'NG', name: 'Nigeria' },
    { id: 'NU', name: 'Niue' },
    { id: 'NF', name: 'Norfolk Island' },
    { id: 'MP', name: 'Northern Mariana Islands' },
    { id: 'NO', name: 'Norway' },
    { id: 'OM', name: 'Oman' },
    { id: 'PK', name: 'Pakistan' },
    { id: 'PW', name: 'Palau' },
    { id: 'PS', name: 'Palestinian Territory, Occupied' },
    { id: 'PA', name: 'Panama' },
    { id: 'PG', name: 'Papua New Guinea' },
    { id: 'PY', name: 'Paraguay' },
    { id: 'PE', name: 'Peru' },
    { id: 'PH', name: 'Philippines' },
    { id: 'PN', name: 'Pitcairn' },
    { id: 'PL', name: 'Poland' },
    { id: 'PT', name: 'Portugal' },
    { id: 'PR', name: 'Puerto Rico' },
    { id: 'QA', name: 'Qatar' },
    { id: 'RE', name: 'Reunion' },
    { id: 'RO', name: 'Romania' },
    { id: 'RU', name: 'Russian Federation' },
    { id: 'RW', name: 'Rwanda' },
    { id: 'BL', name: 'Saint Barthelemy' },
    { id: 'SH', name: 'Saint Helena' },
    { id: 'KN', name: 'Saint Kitts and Nevis' },
    { id: 'LC', name: 'Saint Lucia' },
    { id: 'MF', name: 'Saint Martin' },
    { id: 'PM', name: 'Saint Pierre and Miquelon' },
    { id: 'VC', name: 'Saint Vincent and the Grenadines' },
    { id: 'WS', name: 'Samoa' },
    { id: 'SM', name: 'San Marino' },
    { id: 'ST', name: 'Sao Tome and Principe' },
    { id: 'SA', name: 'Saudi Arabia' },
    { id: 'SN', name: 'Senegal' },
    { id: 'RS', name: 'Serbia' },
    { id: 'CS', name: 'Serbia and Montenegro' },
    { id: 'SC', name: 'Seychelles' },
    { id: 'SL', name: 'Sierra Leone' },
    { id: 'SG', name: 'Singapore' },
    { id: 'SX', name: 'Sint Maarten' },
    { id: 'SK', name: 'Slovakia' },
    { id: 'SI', name: 'Slovenia' },
    { id: 'SB', name: 'Solomon Islands' },
    { id: 'SO', name: 'Somalia' },
    { id: 'ZA', name: 'South Africa' },
    { id: 'GS', name: 'South Georgia and the South Sandwich Islands' },
    { id: 'SS', name: 'South Sudan' },
    { id: 'ES', name: 'Spain' },
    { id: 'LK', name: 'Sri Lanka' },
    { id: 'SD', name: 'Sudan' },
    { id: 'SR', name: 'Suriname' },
    { id: 'SJ', name: 'Svalbard and Jan Mayen' },
    { id: 'SZ', name: 'Swaziland' },
    { id: 'SE', name: 'Sweden' },
    { id: 'CH', name: 'Switzerland' },
    { id: 'SY', name: 'Syrian Arab Republic' },
    { id: 'TW', name: 'Taiwan, Province of China' },
    { id: 'TJ', name: 'Tajikistan' },
    { id: 'TZ', name: 'Tanzania, United Republic of' },
    { id: 'TH', name: 'Thailand' },
    { id: 'TL', name: 'Timor-Leste' },
    { id: 'TG', name: 'Togo' },
    { id: 'TK', name: 'Tokelau' },
    { id: 'TO', name: 'Tonga' },
    { id: 'TT', name: 'Trinidad and Tobago' },
    { id: 'TN', name: 'Tunisia' },
    { id: 'TR', name: 'Turkey' },
    { id: 'TM', name: 'Turkmenistan' },
    { id: 'TC', name: 'Turks and Caicos Islands' },
    { id: 'TV', name: 'Tuvalu' },
    { id: 'UG', name: 'Uganda' },
    { id: 'UA', name: 'Ukraine' },
    { id: 'AE', name: 'United Arab Emirates' },
    { id: 'GB', name: 'United Kingdom' },
    { id: 'US', name: 'United States' },
    { id: 'UM', name: 'United States Minor Outlying Islands' },
    { id: 'UY', name: 'Uruguay' },
    { id: 'UZ', name: 'Uzbekistan' },
    { id: 'VU', name: 'Vanuatu' },
    { id: 'VE', name: 'Venezuela' },
    { id: 'VN', name: 'Viet Nam' },
    { id: 'VG', name: 'Virgin Islands, British' },
    { id: 'VI', name: 'Virgin Islands, U.s.' },
    { id: 'WF', name: 'Wallis and Futuna' },
    { id: 'EH', name: 'Western Sahara' },
    { id: 'YE', name: 'Yemen' },
    { id: 'ZM', name: 'Zambia' },
    { id: 'ZW', name: 'Zimbabwe' },
  ]

  c_bo_country(event: string, selector: string) {
    if (event != '' && typeof (event) != "undefined") {
      event = event.toLowerCase();
      this.bo_country = `flag_holder flag flag-${event}`;
    } else {
      this.bo_country = '';
    }
  }

}
