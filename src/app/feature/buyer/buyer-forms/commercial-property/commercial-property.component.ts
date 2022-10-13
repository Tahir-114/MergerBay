import { Options } from '@angular-slider/ngx-slider';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormTypeEnum } from 'src/app/shared/enums/form-type';
import { SetupService } from 'src/app/shared/services/common/setups.service';
import { FormService } from 'src/app/shared/services/forms/form-seller.service';
import { Sectorervice } from 'src/app/shared/services/sectors/sectors.services';
import { SellerService } from 'src/app/shared/services/seller/seller.service';

@Component({
  selector: 'app-commercial-property',
  templateUrl: './commercial-property.component.html',
  styleUrls: ['../buyer-forms.component.css']
})
export class CommercialPropertyComponent implements OnInit {
  
  @HostListener('window:beforeunload', ['$event']) 
  OnWindowUnload($event:any) {
    if(this.form.dirty || this.form.touched){
      $event.returnValue= true;
    }
  }
//#region UI properties
    formTabSelected: boolean = true;
    bo_country = '';
    bo_location = '';
    bo_inst_country = '';
    c_bo_country(event: any, selector: string) {
      if (event != '' && typeof event != 'undefined') {
        //event = event.toLowerCase();
        let code = this.countries_list
          .find((x) => x.country_Id == event)
          ?.code?.toLowerCase();
        this.bo_country = `flag_holder flag flag-${code}`;
      } else {
        this.bo_country = '';
      }
    }
    c_bo_location(event: any, selector: string) {
      if (event != '' && typeof event != 'undefined') {
        //event = event.toLowerCase();
        let code = this.countries_list
          .find((x) => x.country_Id == event)
          ?.code?.toLowerCase();
        this.bo_location = `flag_holder flag flag-${code}`;
      } else {
        this.bo_location = '';
      }
      this.form.get('city_Id')?.reset();
      this.GetCitiesList(event);
    }
    showMendate = false;
    load_Mendate(event:any) {
      let selectedrole = this.transaction_roles.find((x) => x.role_Id == event)?.name;
      if(selectedrole == 'Direct Party') 
      {
        this.showMendate = false;
      }else{
        this.showMendate = true;
      }
    }  
    //#endregion
    form: FormGroup;
    buyOut_Id: any;

  //#region Setups List Properies
  countries_list: any[];
  cities_list: any[];
  transaction_roles: any[];
  properties_list: any[];
  DefualtCurrency:any;
  //#endregion

  //#region constructor and life cycle hooks
  constructor( 
    private formService: FormService,
    private _setupService: SetupService,
    private _sellerService: SellerService,
    private router: Router,
    private toastr: ToastrService,) { }
    
    ngOnInit(): void {
      this.form = this.formService.initBuyerCommercialProperty();
      //this.getSectors();
      setTimeout(() => {
        this.InitializeData();
      });
      this.getFormData();
    }
  //#endregion
//#region  DropDowns InitializeData
private InitializeData() {
  this.GetDefaultCurrenct();
  this.GetPropertiesList();
  this.GetContriesList();
  this.GetTransactionRolesList();
}
GetContriesList() {
  this._setupService.getCoutries().subscribe((res) => {
    this.countries_list = res as any[];
  });
}
GetCitiesList(countryId: any) {
  this._setupService.getCities(countryId).subscribe((res) => {
    this.cities_list = res as any[];
  });
}
GetTransactionRolesList() {
  this._setupService.getTransactionRoles().subscribe((res) => {
    this.transaction_roles = res as any[];
  });
}
GetPropertiesList() {
  this._setupService.getProperties().subscribe((res) => {
    this.properties_list = res as any[];
  });
}
GetDefaultCurrenct() {
  this._setupService.getDefaultCurrency().subscribe((res) => {
    this.DefualtCurrency = res;
  });
}
//#endregion

//#region Form Related Methods

  //#region  getter
  get _form() {
    return this.form.value;
  }
  //#endregion

  //#region Validations
  validate(nme: string): boolean {
    let cntrol = this.form.get(nme);
    if (!cntrol?.valid && (cntrol?.dirty || cntrol?.touched)) {
      return true;
    }
    return false;
  }
  propertyValueToConverted:number=0;
  propertyValueFromConverted:number=0;

  CalculateCurrency(value:number){
    return (+value * 1000000) / this.DefualtCurrency?.value??1;  
  }
  //#endregion
  //#region Form Methods
  review() {
    this.submitted = true;
    if (!this.form.valid) {
      for (const control of Object.keys(this.form.controls)) {
        this.form.controls[control].markAsTouched();
      }
      setTimeout(() => {
        const collection = document.getElementsByClassName('field_error');
        let el_offsetTop =
          collection[0].getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top: el_offsetTop, behavior: 'smooth' });
      }, 100);
      return;
    }
    if (this.form.get('termsAndConditions')?.value === false) return;
    this.formTabSelected = false;
    setTimeout(() => {
      this.GetBuyOutData();
    });
    let data: any = {
      value: this.form.value,
      sectorsArr: [],
      type: FormTypeEnum.CommercialProperty,
      showMendate:this.showMendate
    };
    localStorage.setItem('form-data', JSON.stringify(data));
  }
  submitted = false;
  SaveForm() {
    //===Checking User is logged in
    if (!this.form.valid) return;

    let model = this.createRequest();
    let userLoggedIn = localStorage.getItem('usertoken');
    if (userLoggedIn == null || localStorage.getItem('usertoken') == '') {
      this.router.navigate(['/add-proposition'], {
        state: { data: JSON.stringify(model) },
      });
      return;
    }

    //console.log(model);
    this._sellerService.saveBayOutForm(model).subscribe(
      (res) => {
        this.toastr.success('Data Saved Successfully','Data Saved');
        localStorage.removeItem('form-data');
        this.router.navigate(['/propositions']);
      }
    );
  }
  cancel() {
    if (this.form.touched) {
      let confirm = window.confirm(
        'Your Changes will be discarded, Do you want to cancel?'
      );
      if (confirm) {
        this.router.navigate(['/']);
        localStorage.removeItem('form-data');
      }
    }
  }
  createRequest() {
    let frm = this.form.value;

    let data = {
      businessLocation_Id: frm.businessLocation_Id,
      property_Id: frm.property_Id,
      country_Ids: frm.country_Ids,
      city_Id: frm.city_Id,
      propertyValueFrom: frm.propertyValueFrom,
      propertyValueTo: frm.propertyValueTo,
      isFinancingRequired: frm.isFinancingRequired,
      transactionRole_Id: frm.transactionRole_Id,
      isMendate: frm.isMendate,
      status: 'Pending',
      description: frm.description,
      type: 'Buy',
      subType: FormTypeEnum.CommercialProperty,
      UserId: localStorage.getItem('userId'),
    };
    return data;
  }
  resetForm() {
    this.submitted = false;
    this.form.reset();
  }
  getFormData() {
    let form_data = localStorage.getItem('form-data');
    setTimeout(() => {
      if (form_data != null) {
        let data = JSON.parse(form_data);
        if (data.type == FormTypeEnum.CommercialProperty) {
          this.GetCitiesList(data.value.country_Ids);
          this.propertyValueFromConverted = this.CalculateCurrency(data.value?.propertyValueFrom);
          this.propertyValueToConverted = this.CalculateCurrency(data.value?.propertyValueTo);
          this.form.patchValue(data.value);
          this.showMendate = data.showMendate;
          //this.sectorsArr = data.sectorsArr;
          //this.showSubSectors = this.sectorsArr.some((x) => x.subSectorArr.length > 0)? true: false;
        }
      }
    });
  }
  _data: any = {};
  GetBuyOutData() {
    let selectedLocation = this.countries_list.find((x) => x.country_Id == this._form.businessLocation_Id)?.name;
    let selectedPropertyLocation = this.countries_list.find((x) => x.country_Id == this._form.country_Ids)?.name;
    // let selectedyear  = this.year_establishments.find(x =>x.year_Id == this._form.year_Id)?.year;
    let selectedrole = this.transaction_roles.find((x) => x.role_Id == this._form.transactionRole_Id)?.name;
    let selectedProperty = this.properties_list.find((x) => x.property_Id == this._form.property_Id)?.name;
    let selectedCity= this.cities_list.find((x) => x.city_Id == this._form.city_Id)?.name;   
    //let selectedDuration = this.contractDurations_list.find((x) => x.duration_Id == this._form.duration_Id)?.name;
    this._data = {
      location: selectedLocation,
      property: selectedProperty,
      country:selectedPropertyLocation,
      city:selectedCity,
      propertyValueFrom: this._form.propertyValueFrom,
      propertyValueTo: this._form.propertyValueTo,
      isFinancingRequired: this._form.isFinancingRequired,
      role: selectedrole,
      isMendate: this._form.isMendate,
      description: this._form.description,
    };
  }

  //#endregion

  //#endregion



}
