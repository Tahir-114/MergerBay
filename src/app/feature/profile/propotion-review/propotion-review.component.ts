import { SetupService } from 'src/app/shared/services/common/setups.service';
import { GlobalServiceService } from 'src/app/shared/services/global/global.service';
import { SP_BUYOUTS } from 'src/app/shared/models/SP_BUYOUTS';
import { SP_SELLOUTS } from 'src/app/shared/models/SP_SELLOUTS';
import { SellerService } from './../../../shared/services/seller/seller.service';
import { FormTypeEnum } from 'src/app/shared/enums/form-type';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchParams } from 'src/app/shared/models/SearchParams';

@Component({
  selector: 'app-propotion-review',
  templateUrl: './propotion-review.component.html',
  styleUrls: ['./propotion-review.component.css']
})
export class PropotionReviewComponent implements OnInit {

  formId: any;
  type: any;
  data: any;
  params: SearchParams;
  formTypeCommercial = FormTypeEnum.CommercialProperty;
  formTypeBuyer = FormTypeEnum.Buy;

  showTransactionType = false;
  showMendate =  false;
  userId :any;

  constructor(private _Activatedroute: ActivatedRoute,private router:Router, private _sellerService: SellerService
    ,private _setupService:SetupService
    ) {
    // this.data = this.router.getCurrentNavigation()?.extras?.state?.['data'];
    // console.log(this.data);
   }

  ngOnInit(): void {
    ///====Reading data From Routes
    this._Activatedroute.paramMap.subscribe(params => {
      this.formId = params.get('formId');
      this.type = params.get('type');

      this.params =  {
        formId : this.formId,
        type: this.type
      }
    });
     this.userId = localStorage.getItem('userId');
    if (this.userId == null || localStorage.getItem('userId') == '') {
      this.router.navigate(['/add-proposition'], {
        state: { detail: JSON.stringify(this.params)},
      });
      return;
    }


  setTimeout(() =>{
    if (this.formId) 
    {
      this.params = {
        formId: this.formId,
      }
      if (this.type == FormTypeEnum.Buy) {
        this.readBuyOutData();
      } else {
        this.readSellOutData();
      }
    }
  });

  //============Save Deal as Viewed in Recommendation table
  if(this.userId){
    setTimeout(() => {
      this.saveAsLastViewed();
    });
  }

}
  readSellOutData() {
    this._sellerService.readSelloutData(this.params).subscribe(res => {
      this.data = res;
    });
  }
  readBuyOutData() {
    this._sellerService.readBuyoutData(this.params).subscribe(res => {
      this.data = res;
    });
  }

  saveAsLastViewed(){
    let model = {
      userId : this.userId,
      type : this.type, 
      formId: this.formId,
    }
    this._setupService.saveRecommendedDeals(model).subscribe(res => {
      console.log(JSON.stringify(res));
    });

  }
}
