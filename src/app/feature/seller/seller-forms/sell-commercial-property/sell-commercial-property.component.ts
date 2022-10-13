import { FormTypeEnum } from './../../../../shared/enums/form-type';
import { Component, HostListener, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { FormGroup } from '@angular/forms';
import { Sectorervice } from 'src/app/shared/services/sectors/sectors.services';
import { FormService } from 'src/app/shared/services/forms/form-seller.service';
import { SetupService } from 'src/app/shared/services/common/setups.service';
import { SellerService } from 'src/app/shared/services/seller/seller.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sell-commercial-property',
  templateUrl: './sell-commercial-property.component.html',
  styleUrls: ['../seller-forms.component.css']
})
export class SellCommercialPropertyComponent implements OnInit {

    //#region UI properties
    value: number = 15;
    highValue: number = 1000;
    options: Options = {
      floor: 25,
      ceil: this.highValue,
      translate: (value: number): string => {
        return 'AED ' + value + ' Million';
      },
    };
    fixed_value: number = 35;
    fixed_highValue: number = 100;
    fixed_options: Options = {
      floor: 0,
      ceil: this.fixed_highValue,
      translate: (value: number): string => {
        return 'AED ' + value + ' Million';
      },
    };
    inventory_value: number = 55;
    inventory_highValue: number = 100;
    inventory_options: Options = {
      floor: 0,
      ceil: this.inventory_highValue,
      translate: (value: number): string => {
        return 'AED ' + value + ' Million';
      },
    };
    formTabSelected: boolean = true;
    bo_country = '';
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
    @HostListener('window:beforeunload', ['$event'])
    doSomething($event:any) {
      $event.returnValue= true;
      //console.log($event);
    }
    form: FormGroup;
    sellOut_Id: any;
  //#region Setups List Properies
  countries_list: any[];
  year_establishments: any[];
  transaction_roles: any[];
  properties_list: any[];
  contractDurations_list: any[];
  //#endregion
  //#region constructor and life cycle hooks
  constructor(
    private sector: Sectorervice,
    private formService: FormService,
    private _setupService: SetupService,
    private _sellerService: SellerService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.form = this.formService.initCommercialProperty();
    //this.getSectors();
    setTimeout(() => {
      this.InitializeData();
    });
    this.getFormData();
  }
  //#endregion

//#region  DropDowns InitializeData
    private InitializeData() {
      this.GetContriesList();
      this.GetEstablishmentList();
      this.GetTransactionRolesList();
      this.GetPropertiesList();
      this.GetContractDurationsList();
    }
    GetContriesList() {
      this._setupService.getCoutries().subscribe((res) => {
        this.countries_list = res as any[];
      });
    }
    GetEstablishmentList() {
      this._setupService.getYearEstablishMents().subscribe((res) => {
        this.year_establishments = res as any[];
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
    GetContractDurationsList() {
      this._setupService.getContractDurations().subscribe((res) => {
        this.contractDurations_list = res as any[];
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
      this.GetSelOutData();
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
    //this.submitted = true;
    // if(!this.sellOutForm.valid){
    //   this.submitted = true;
    //   for (const control of Object.keys(this.sellOutForm.controls)) {
    //     this.sellOutForm.controls[control].markAsTouched();
    //   }
    //   return;
    // }
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
    this._sellerService.saveSellOutForm(model).subscribe(
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
      sellOut_Id: this.sellOut_Id,
      projectName: frm.projectName,
      businessLocation_Id: frm.businessLocation_Id,
      year_Id: frm.year_Id,
      property_Id: frm.property_Id,
      duration_Id: frm.duration_Id,
      propertyValue: frm.propertyValue,
      landArea: frm.landArea,
      builtUpArea: frm.builtUpArea,
      hasContract : frm.hasContract,
      annualGrossIncome : frm.annualGrossIncome,
      isValuationReport: frm.isValuationReport,
      transactionRole_Id: frm.transactionRole_Id,
      isMendate: frm.isMendate,
      status: 'Pending',
      description: frm.description,
      type: 'Sell',
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
          //this.calculateYears(data.value.year_Id);
          this.form.patchValue(data.value);
          this.showMendate = data.showMendate;
          //this.sectorsArr = data.sectorsArr;
          //this.showSubSectors = this.sectorsArr.some((x) => x.subSectorArr.length > 0)? true: false;
        }
      }
    });
  }
  _data: any = {};
  GetSelOutData() {
    let selectedLocation = this.countries_list.find((x) => x.country_Id == this._form.businessLocation_Id)?.name;
    // let selectedyear  = this.year_establishments.find(x =>x.year_Id == this._form.year_Id)?.year;
    let selectedrole = this.transaction_roles.find((x) => x.role_Id == this._form.transactionRole_Id)?.name;
    let selectedProperty = this.properties_list.find((x) => x.property_Id == this._form.property_Id)?.name;
    let selectedDuration = this.contractDurations_list.find((x) => x.duration_Id == this._form.duration_Id)?.name;
     
  
    this._data = {
      projectName: this._form.projectName,
      location: selectedLocation,
      year: this._form.year_Id,
      duration : selectedDuration,
      property: selectedProperty,
      propertyValue: this._form.propertyValue,
      landArea: this._form.landArea,
      builtUpArea: this._form.builtUpArea,
      hasContract: this._form.hasContract,
      annualGrossIncome:this._form.annualGrossIncome,
      isValuationReport : this._form.isValuationReport,
      role: selectedrole,
      isMendate: this._form.isMendate,
      description: this._form.description,
    };
  }

  //#endregion

  //#endregion


}
