import { FormTypeEnum } from './../../../../shared/enums/form-type';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SectorMain } from 'src/app/shared/models/Sector';
import { SetupService } from 'src/app/shared/services/common/setups.service';
import { FormService } from 'src/app/shared/services/forms/form-seller.service';
import { Sectorervice } from 'src/app/shared/services/sectors/sectors.services';
import { SellerService } from 'src/app/shared/services/seller/seller.service';

@Component({
  selector: 'app-buy-out',
  templateUrl: './buy-out.component.html',
  styleUrls: ['../buyer-forms.component.css']
})

export class BuyOutComponent implements OnInit {
 
 @HostListener('window:beforeunload', ['$event'])
  onWindowUnload($event:any) {
    if(this.form.touched){
      $event.returnValue= true;
    }
  }
  @Input() FormType?: string = 'BuyOut';
  form: FormGroup;
  buyOut_Id: any;
  showTransactionType:boolean = false;

 //#region other properties
  currenYear = new Date().getFullYear();
 //#endregion
  
  //#region Setups List Properies
  ///All Sectors coming from db will be saved in this list
  sectors_interested: SectorMain[];
  /// load sectors////
  sectorsArr: SectorMain[] = [];
  //only checked sectors will be stored in this list
  selectedSectorsArray: SectorMain[];

  countries_list: any[];
  cities_list: any[];
  transaction_roles: any[];
  transactionTypes_list: any[];
  ownershiptPref_list: any[];
  revenuePref_list: any[];
  currency:any;

  //#endregion

  //#region UI properties
  formTabSelected: boolean = true;
  bo_country = '';
  bo_inst_country = '';

  showSubSectors = false;
  load_sectors(event: any) {
    // this.subSectorsArr=this.sectors_interested.find(s=>s.sectorId==event);
    let sectorsIds = this._form.sector_Ids as any[];
    this.sectorsArr = this.sectors_interested.filter(function (item) {
      return sectorsIds.indexOf(item.sectorId) !== -1;
    });

    this.showSubSectors = this.sectorsArr.some((x) => x.subSectorArr.length > 0)
      ? true
      : false;
  }
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
  c_bo_inst_country(event: string, selector: string) {
    if (event != '' && typeof event != 'undefined') {
      let code = this.countries_list
        .find((x) => x.country_Id == event)
        ?.code?.toLowerCase();
      this.bo_inst_country = `flag_holder flag flag-${code}`;
    } else {
      this.bo_inst_country = '';
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

    //#region constructor and life cycle hooks
    constructor(
      private sectorService: Sectorervice,
      private formService: FormService,
      private _setupService: SetupService,
      private _sellerService: SellerService,
      private router: Router,
      private toastr: ToastrService,
    ) {}
  
    ngOnInit(): void {
      this.form = this.formService.initBuyOutForm();
      if(this.FormType == FormTypeEnum.ButOut || this.FormType == FormTypeEnum.Investment ){
        this.form.get('transactionType_Id')?.clearValidators(); 
        this.showTransactionType = false;

      }
      else if(this.FormType == FormTypeEnum.MergerAndAcquisitions){
        this.form.get('pref_Id')?.clearValidators();  
        this.showTransactionType = true;
        
      }
      //this.getSectors();
      setTimeout(() => {
        this.InitializeData();
      });
      this.getFormData();

    }
    //#endregion
//#region  DropDowns InitializeData
  private InitializeData() {
    this.GetDefaultCurrency();
    this.GetContriesList();
    this.GetSectorsList();
    this.GetOwnerShipPrefList();
    this.GetRevenuePrefList();
    this.GetTransactionTypesList();
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
  GetSectorsList() {
    this._setupService.getSectors().subscribe((res) => {
      this.sectors_interested = res as SectorMain[];
    });
  }
  getSectors() {
    const requestData = {
      companyId: 'test',
    };
    this.sectorService.getsectors(requestData).subscribe(
      (data: any) => {
        this.sectors_interested = data;
      }
    );
  }
  GetOwnerShipPrefList() {
    this._setupService.getOwnerShipPreference().subscribe((res) => {
      this.ownershiptPref_list = res as any[];
    });
  }
  GetRevenuePrefList() {
    this._setupService.getRevenuePreferences().subscribe((res) => {
      this.revenuePref_list = res as any[];
    });
  }
  GetTransactionRolesList() {
    this._setupService.getTransactionRoles().subscribe((res) => {
      this.transaction_roles = res as any[];
    });
  }
  GetTransactionTypesList() {
    this._setupService.getTransactionTypes().subscribe((res) => {
      this.transactionTypes_list = res as any[];
    });
  }
  GetDefaultCurrency() {
    this._setupService.getDefaultCurrency().toPromise().then(res =>{
      this.currency = res;
      this.valuationPreferenceFromConverted = this.CalculateCurrency(this._form.valuationPreferenceFrom);
      this.valuationPreferenceToConverted = this.CalculateCurrency(this._form.valuationPreferenceTo);
      this.investmentValueFromConverted = this.CalculateCurrency(this._form.investmentValueFrom);
      this.investmentValueToConverted = this.CalculateCurrency(this._form.investmentValueTo);
    })
  }
  //#endregion

   
//#region Form Related Methods
    //#region  Form Validations
    validate(nme: string): boolean {
      let cntrol = this.form.get(nme);
      if (!cntrol?.valid && (cntrol?.dirty || cntrol?.touched)) {
        return true;
      }
      return false;
    }
    valuationPreferenceFromConverted:number=0;
    valuationPreferenceToConverted:number=0;
    investmentValueFromConverted:number=0;
    investmentValueToConverted:number=0;
    CalculateCurrency(value:any){

     return (+value * 1000000) / this.currency?.value??1;  
    }
    //#endregion

  //#region  getter
  get _form() {
    return this.form.value;
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
      sectorsArr: this.sectorsArr,
      type: this.FormType,
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
      },
      (err) => {
        this.toastr.error(JSON.stringify(err), 'Server Error');
      }
    );
  }
  cancel() {
    if (this.form.dirty) {
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

    //this array is filtered out when user clicks on review button...use this array to send sectors data to API
    //this.selectedSectorsArray = this.sectorsArr.filter(x => x.subSectorArr.status == true);

    let data = {
      buyOut_Id: this.buyOut_Id,
      businessLocation_Id: frm.businessLocation_Id,
      country_Ids: frm.country_Ids,
      sector_Ids :frm.sector_Ids.toString(),
      city_Id: frm.city_Id,
      pref_Id: frm.pref_Id,
      transactionType_Id: frm.transactionType_Id,
      valuationPreferenceFrom: frm.valuationPreferenceFrom,
      valuationPreferenceTo: frm.valuationPreferenceTo,
      investmentValueFrom: frm.investmentValueFrom,
      investmentValueTo: frm.investmentValueTo,
      revenue_Id: frm.revenue_Id,
      eBITDA: frm.eBITDA,
      netProfit: frm.netProfit,
      isFinancingRequired: frm.isFinancingRequired,
      transactionRole_Id: frm.transactionRole_Id,
      isMendate: frm.isMendate,
      status: 'Pending',
      description: frm.description,
      type: 'Buy',
      subType: this.FormType,
      UserId: localStorage.getItem('userId'),
      SectorsArray: this.selectedSectorsArray,
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
        if (data.type == this.FormType) {
          this.GetCitiesList(data.value.country_Ids);
          this.form.patchValue(data.value);
          this.sectorsArr = data.sectorsArr;
          this.showSubSectors = this.sectorsArr.some((x) => x.subSectorArr.length > 0)? true: false;
          this.showMendate = data.showMendate;
        }
      }
    });
  }
  _data: any = {};
  GetBuyOutData() {
    let frm = this.form.value;
    let selectedLocation = this.countries_list.find((x) => x.country_Id == frm.businessLocation_Id)?.name;
    let selectedCountry = this.countries_list.find((x) => x.country_Id == frm.country_Ids)?.name;
    let selectedCity= this.cities_list.find((x) => x.city_Id == frm.city_Id)?.name;   
    let selectedOwnerShip= this.ownershiptPref_list.find((x) => x.pref_Id == frm.pref_Id)?.name;   
    let selectedRevenuePreference= this.revenuePref_list.find((x) => x.revenue_Id == frm.revenue_Id)?.name;   
    let selectedrole = this.transaction_roles.find((x) => x.role_Id == frm.transactionRole_Id)?.name;
    let selectedTransactionType = this.transactionTypes_list.find((x) => x.transactionType_Id == frm.transactionType_Id)?.name;
 
    // var subSidiaries = this.countries_list.filter(function (item) {
    //     return subsidiaryIds.indexOf(item.country_Id) !== -1;
    //   }).map((x) => x.name);
    //   let sectorsIds  = this._form.sector_Ids as any[];
    //   var sectors = this.sectors_interested.filter(function(item) {
    //     return sectorsIds.indexOf(item.sectorId) !== -1;
    // }).map(x=>x.sectorName);

    this.selectedSectorsArray = Sectorervice.GetOnlySelectedSectors(
      this.sectorsArr
    );
    let sectors = this.selectedSectorsArray.map((x) => x.sectorName);
    this._data = {
      location: selectedLocation,
      country: selectedCountry,
      city: selectedCity,
      sectors: sectors.toString(),
      ownerShipPreference: selectedOwnerShip,
      transactionType: selectedTransactionType,
      valuationPreferenceFrom: frm.valuationPreferenceFrom,
      valuationPreferenceTo: frm.valuationPreferenceTo,
      investmentValueFrom: frm.investmentValueFrom,
      investmentValueTo: frm.investmentValueTo,
      revenuePreference: selectedRevenuePreference,
      eBITDA : frm.eBITDA,
      netProfit: frm.netProfit,
      isFinancingRequired : frm.isFinancingRequired,
      role: selectedrole,
      isMendate: this._form.isMendate,
      description: this._form.description,
    };
  }

  //#endregion

  //#endregion

  
}
