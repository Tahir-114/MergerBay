import { SP_RecommendedDeals } from './../../../shared/models/RecommendedDeals';
import { SellerService } from 'src/app/shared/services/seller/seller.service';
import { Component, OnInit } from '@angular/core';
import { FormTypeEnum } from 'src/app/shared/enums/form-type';

@Component({
  selector: 'app-propositions',
  templateUrl: './propositions.component.html',
  styleUrls: ['./propositions.component.css']
})
export class PropositionsComponent implements OnInit {

  formTypeCommercial = FormTypeEnum.CommercialProperty;
  slides:SP_RecommendedDeals[] = [];
  userId =  localStorage.getItem('userId');
  constructor(private _sellerService: SellerService) { }

  ngOnInit(): void {
    this.loadPropositions();
    this.loadRecommendedDeals();
  }
  // slides = [
  //   { type: 'acquired', img: "../../../../assets/images/acquired_tag.png", title: 'Restaurant chain with Rev/EBITDA', desc: 'USD 26M/USD 3M seeking buyers.', user: '125693' },
  //   { type: 'sold', img: "../../../../assets/images/sold_tag.png", title: 'Restaurant chain with Rev/EBITDA', desc: 'USD 26M/USD 3M seeking buyers.', user: '125693' },
  //   { type: 'acquired', img: "../../../../assets/images/acquired_tag.png", title: 'Restaurant chain with Rev/EBITDA', desc: 'USD 26M/USD 3M seeking buyers.', user: '125693' },
  //   { type: 'sold', img: "../../../../assets/images/sold_tag.png", title: 'Restaurant chain with Rev/EBITDA', desc: 'USD 26M/USD 3M seeking buyers.', user: '125693' },
  //   { type: 'acquired', img: "../../../../assets/images/acquired_tag.png", title: 'Restaurant chain with Rev/EBITDA', desc: 'USD 26M/USD 3M seeking buyers.', user: '125693' },
  //   { type: 'sold', img: "../../../../assets/images/sold_tag.png", title: 'Restaurant chain with Rev/EBITDA', desc: 'USD 26M/USD 3M seeking buyers.', user: '125693' },
  // ];
  slideConfig = {
    slidesToShow: 3,
    prevArrow: '<button class="slide-arrow prev-arrow"><img src="../../../../assets/images/prev-arrow.png" class="img-fluid" alt="Prev Arrow" ></button>',
    nextArrow: '<button class="slide-arrow next-arrow"><img src="../../../../assets/images/next-arrow.png" class="img-fluid" alt="Next Arrow" ></button>',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          arrows: true,
          slidesToShow: 3
        }
      },
      {
        breakpoint: 992,
        settings: {
          arrows: true,
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          slidesToShow: 1
        }
      }
    ]
  };

  propositionsList:any[]  = [];
  loadPropositions(){
  //  let userId  = localStorage.getItem('userId');
   if(this.userId){
    this._sellerService.GetSelloutFormData(this.userId)
    .subscribe(res => {
      this.propositionsList = res as any[]
    });
   }
  }
  loadRecommendedDeals(){
    this._sellerService.readRecommendedDeals(this.userId).subscribe(res => {
      this.slides =  res;
      console.log(this.slides);
    });
  }


}
