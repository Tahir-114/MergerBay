import { ToastrService } from 'ngx-toastr';
import { SectorMain} from './../../../../shared/models/Sector';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { FormService } from 'src/app/shared/services/forms/form-seller.service';
import { FormArray, FormGroup, Validators,FormControl } from '@angular/forms';
import { SetupService } from 'src/app/shared/services/common/setups.service';
import { SellerService } from 'src/app/shared/services/seller/seller.service';
import { Router } from '@angular/router';
import { Sectorervice } from 'src/app/shared/services/sectors/sectors.services';
import { NumbersOnly } from 'src/app/shared/services/common/Validations';

@Component({
  selector: 'app-sell-out',
  templateUrl: './sell-out.component.html',
  styleUrls: ['../seller-forms.component.css'],
})
export class SellOutComponent implements OnInit {
  
  @Input() FormType?: string = 'SellOut';
  //#region UI properties
  value: number = 15;
  highValue: number = 250;
  options: Options = {
    floor: 7,
    ceil: this.highValue,
    translate: (value: number): string => {
      return 'AED ' + value + ' Million';
    },
  };
  fixed_value: number = 35;
  fixed_highValue: number = 250;
  fixed_options: Options = {
    floor: 7,
    ceil: this.fixed_highValue,
    translate: (value: number): string => {
      return 'AED ' + value + ' Million';
    },
  };
  inventory_value: number = 55;
  inventory_highValue: number = 250;
  inventory_options: Options = {
    floor: 7,
    ceil: this.inventory_highValue,
    translate: (value: number): string => {
      return 'AED ' + value + ' Million';
    },
  };
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
    debugger;
    if (event != '' && typeof event != 'undefined') {
      let code = this.countries_list
        .find((x) => x.country_Id == event)
        ?.code?.toLowerCase();
      this.bo_inst_country = `flag_holder flag flag-${code}`;
    } else {
      this.bo_inst_country = '';
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
  onWindowUnlaod($event:any) {
    if(this.sellOutForm.touched){
      $event.returnValue= true;
    }
    //console.log($event);
  }
  sellOutForm: FormGroup;
  sellOut_Id: any;
  //#region Setups List Properies
  ///All Sectors coming from db will be saved in this list
  sectors_interested: SectorMain[];
  /// load sectors////
  sectorsArr: SectorMain[] = [];
  //only checked sectors will be stored in this list
  selectedSectorsArray: SectorMain[];

  countries_list: any[];
  year_establishments: any[];
  transaction_roles: any[];
  ownershipt_pref: any[];
  //#endregion

  //#region other properties
  currenYear = new Date().getFullYear();
  //#endregion

  //#region constructor and life cycle hooks
  constructor(
    private sector: Sectorervice,
    private form: FormService,
    private _setupService: SetupService,
    private _sellerService: SellerService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.sellOutForm = this.form.initSelOutForm();
    //this.getSectors();
    setTimeout(() => {
      this.InitializeData();
    });
    this.getFormData();
  }
  //#endregion

  //#region  Additional Methods
  validate(nme: string): boolean {
    let cntrol = this.sellOutForm.get(nme);
    if (!cntrol?.valid && (cntrol?.dirty || cntrol?.touched)) {
      return true;
    }
    return false;
  }

  yearsDifference = 0;
  calculateYears(event: string) {
    this.revenue.clear();
    this.EBITAY.clear();
    this.netProfit.clear();

    let index = 3;
    // if(this.year_establishments == undefined) setTimeout(() => {this.GetEstablishmentList()});
    //let selectedyear  = this.year_establishments.find(x =>x.year_Id == this._form.year_Id)?.year;
    let selectedyear = event;
    if (selectedyear) {
      let yearsDiff = this.currenYear - parseInt(selectedyear);
      if (yearsDiff < 4) {
        index = yearsDiff;
      }
      this.yearsDifference = yearsDiff;
    }

    for (let i = 0; i <= index; i++) {
      this.revenue.push(
        new FormControl('', {
          validators: Validators.compose([
            Validators.required,
            NumbersOnly(),
          ]),
          updateOn: 'blur',
        })
      );
      this.EBITAY.push(
        new FormControl('', {
          validators: Validators.compose([
            Validators.required,
            NumbersOnly(),
          ]),
          updateOn: 'blur',
        })
      );
      this.netProfit.push(
        new FormControl('', {
          validators: Validators.compose([
            Validators.required,
            NumbersOnly(),
          ]),
          updateOn: 'blur',
        })
      );
    }
  }
  //#endregion

  //#region Form Related Methods

  //#region  getter
  get revenue(): FormArray {
    return this.sellOutForm.get('revenue') as FormArray;
  }
  get EBITAY(): FormArray {
    return this.sellOutForm.get('ebitay') as FormArray;
  }
  get netProfit(): FormArray {
    return this.sellOutForm.get('netProfit') as FormArray;
  }

  get _form() {
    return this.sellOutForm.value;
  }
  //#endregion

  //#region Form Methods
  review() {
    this.submitted = true;
    if (!this.sellOutForm.valid) {
      for (const control of Object.keys(this.sellOutForm.controls)) {
        this.sellOutForm.controls[control].markAsTouched();
      }
      setTimeout(() => {
        const collection = document.getElementsByClassName('field_error');
        let el_offsetTop =
          collection[0].getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top: el_offsetTop, behavior: 'smooth' });
      }, 100);
      return;
    }
    if (this.sellOutForm.get('termsAndConditions')?.value === false) return;
    this.formTabSelected = false;
    setTimeout(() => {
      this.GetSelOutData();
    });
    let data: any = {
      value: this.sellOutForm.value,
      sectorsArr: this.sectorsArr,
      type: this.FormType,
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
    if (!this.sellOutForm.valid) return;

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
      },
      (err) => {
        this.toastr.error(JSON.stringify(err), 'Server Error');
      }
    );
  }
  cancel() {
    if (this.sellOutForm.touched) {
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
    let frm = this.sellOutForm.value;
    let revenues = this.revenue.value?.toString();
    let ebitays = this.EBITAY.value?.toString();
    let netProfits = this.netProfit.value?.toString();

    //this array is filtered out when user clicks on review button...use this array to send sectors data to API
    //this.selectedSectorsArray = this.sectorsArr.filter(x => x.subSectorArr.status == true);

    let data = {
      sellOut_Id: this.sellOut_Id,
      projectName: frm.projectName,
      businessLocation_Id: frm.businessLocation_Id,
      subsidiary_Ids: frm.subsidiary_Ids.toString(),
      sector_Ids: frm.sector_Ids.toString(),
      subSector_Ids: frm.subSector_Ids.toString(),
      year_Id: frm.year_Id,
      revenue: revenues,
      ebitay: ebitays,
      netProfit: netProfits,
      sellingValue: frm.sellingValue,
      fixedAssets: frm.fixedAssets,
      inventoryValue: frm.inventoryValue,
      isBankDebit: frm.isBankDebit,
      isAuditFinancialStatement: frm.isAuditFinancialStatement,
      isValuationReport: frm.isValuationReport,
      transactionRole_Id: frm.transactionRole_Id,
      isMendate: frm.isMendate,
      status: 'Pending',
      description: frm.description,
      type: 'Sell',
      subType: this.FormType,
      UserId: localStorage.getItem('userId'),
      SectorsArray: this.selectedSectorsArray,
    };
    return data;
  }
  resetForm() {
    this.submitted = false;
    this.sellOutForm.reset();
  }
  getFormData() {
    let form_data = localStorage.getItem('form-data');
    setTimeout(() => {
      if (form_data != null) {
        let data = JSON.parse(form_data);
        if (data.type == this.FormType) {
          this.calculateYears(data.value.year_Id);
          this.sellOutForm.patchValue(data.value);
          this.sectorsArr = data.sectorsArr;
          this.showSubSectors = this.sectorsArr.some((x) => x.subSectorArr.length > 0)? true: false;
          this.showMendate = data.showMendate;
        }
      }
    });
  }
  _data: any = {};
  GetSelOutData() {
    let selectedLocation = this.countries_list.find(
      (x) => x.country_Id == this._form.businessLocation_Id
    )?.name;
    // let selectedyear  = this.year_establishments.find(x =>x.year_Id == this._form.year_Id)?.year;
    let selectedrole = this.transaction_roles.find(
      (x) => x.role_Id == this._form.transactionRole_Id
    )?.name;
    let subsidiaryIds = this._form.subsidiary_Ids as any[];

    var subSidiaries = this.countries_list
      .filter(function (item) {
        return subsidiaryIds.indexOf(item.country_Id) !== -1;
      })
      .map((x) => x.name);
    //   let sectorsIds  = this._form.sector_Ids as any[];
    //   var sectors = this.sectors_interested.filter(function(item) {
    //     return sectorsIds.indexOf(item.sectorId) !== -1;
    // }).map(x=>x.sectorName);

    this.selectedSectorsArray = Sectorervice.GetOnlySelectedSectors(
      this.sectorsArr
    );
    let sectors = this.selectedSectorsArray.map((x) => x.sectorName);
    this._data = {
      projectName: this._form.projectName,
      location: selectedLocation,
      year: this._form.year_Id,
      role: selectedrole,
      subsidiaries: subSidiaries.toString(),
      sectors: sectors.toString(),
      sellingValue: this._form.sellingValue,
      fixedAssets: this._form.fixedAssets,
      inventoryValue: this._form.inventoryValue,
      isBankDebit: this._form.isBankDebit,
      isAuditFinancialStatement: this._form.isAuditFinancialStatement,
      isValuationReport: this._form.isValuationReport,
      isMendate: this._form.isMendate,
      description: this._form.description,
    };
  }

  //#endregion

  //#endregion

  //#region  DropDowns InitializeData
  private InitializeData() {
    this.GetContriesList();
    this.GetSectorsList();
    this.GetEstablishmentList();
    this.GetOwnerShipPrefList();
    this.GetTransactionRolesList();
  }
  GetContriesList() {
    this._setupService.getCoutries().subscribe((res) => {
      this.countries_list = res as any[];
    });
  }

  GetSectorsList() {
    this._setupService.getSectors().subscribe((res) => {
      this.sectors_interested = res as SectorMain[];
    });
  }

  getSectors() {
    debugger;
    const requestData = {
      companyId: 'test',
    };
    this.sector.getsectors(requestData).subscribe(
      (data: any) => {
        debugger;
        this.sectors_interested = data;
      },
      (error) => {
        // this.toastr.error(
        //   "Something went wrong while processing your request",
        //   "Error"
        // );
      }
    );
  }

  GetEstablishmentList() {
    this._setupService.getYearEstablishMents().subscribe((res) => {
      this.year_establishments = res as any[];
        // var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});        
        // this.year_establishments.sort(collator.compare);
      // console.log(this.year_establishments.sort(x => x.year));
    });
  }
  GetOwnerShipPrefList() {
    this._setupService.getOwnerShipPreference().subscribe((res) => {
      this.ownershipt_pref = res as any[];
    });
  }
  GetTransactionRolesList() {
    this._setupService.getTransactionRoles().subscribe((res) => {
      this.transaction_roles = res as any[];
    });
  }
  //#endregion

  // GetOnlySelectedSectors(){

  //   const sectorsSelected:SectorMain[]  = [];
  //    this.selectedSectorsArray = JSON.parse(JSON.stringify(this.sectorsArr)) as SectorMain[];
  //   //this.selectedSectorsArray = Sectorervice.GetOnlySelectedSectors(this.sectorsArr);

  //   Object.assign(sectorsSelected, this.sectorsArr);

  //   let main:SectorMain;
  //   let detail:SectorDetail;
  //   let item:SectorDetail_Items;

  //   //return this.sectorsArr.filter(x => x.subSectorArr.filter(x => x.status ==true).filter(y => y.subSectorItemArr.filter(z => z.status == true)));
  //   this.selectedSectorsArray.forEach(x=>{
  //   //main =  x;   ///Sector  Energy
  //   x.subSectorArr =  x.subSectorArr.filter(x => x.status == true); //Sectors.subsectors = which has true status only
  //   x.subSectorArr.forEach(y => {
  //      y.subSectorItemArr = y.subSectorItemArr.filter(x => x.status == true); //which select only selected items
  //     })
  //  });
  // }
}
