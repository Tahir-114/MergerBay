import { SP_SELLOUTS } from 'src/app/shared/models/SP_SELLOUTS';
import { SP_RecommendedDeals } from './../../models/RecommendedDeals';
import { SearchParams } from './../../models/SearchParams';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalServiceService } from '../global/global.service';
import { map, of } from 'rxjs';
import { SP_BUYOUTS } from '../../models/SP_BUYOUTS';

@Injectable({providedIn: 'root'})
export class SellerService {
    constructor(private http: HttpClient) { }

    featuredSellouts : SP_SELLOUTS[] = [];
    featuredBuyouts : SP_BUYOUTS[] = [];
    recommendedDeals : SP_RecommendedDeals[] = [];


    baseUrl = GlobalServiceService.ApiUrl+'Seller/'; //Causing issue 
  
    saveSellOutForm(model:any){
       return this.http.post(this.baseUrl+'Save/Seller',model);
    }
    saveBayOutForm(model:any){
      return this.http.post(this.baseUrl+'Save/Buyer',model);
   }
    GetSelloutFormData(userId:any){
       return this.http.get(this.baseUrl+'Get/Propositions/'+userId)
       .pipe(
        
       )
       ;
    }
    readFeaturedSellOuts(prm: SearchParams){
      if(this.featuredSellouts.length > 0) return of(this.featuredSellouts);
      return this.http.get<SP_SELLOUTS[]>(this.baseUrl+'Get/FeaturedSellOuts',{params: {...prm}}).pipe(
         map(res => {
            this.featuredSellouts =  res;
            return res;
         })
       );
    }
    readFeaturedBuyOuts(prm: SearchParams){
      if(this.featuredBuyouts.length > 0) return of(this.featuredBuyouts);
      return this.http.get<SP_BUYOUTS[]>(this.baseUrl+'Get/FeaturedBuyOuts',{params: {...prm}}).pipe(
         map(res => {
            this.featuredBuyouts =  res;
            return res;
         }));
    }
    readRecommendedDeals(userId: any){
      return this.http.get<SP_RecommendedDeals[]>(this.baseUrl+'Get/RecommendedDeals/'+userId);
    }
    readSelloutData(prm: SearchParams){
      return this.http.get<SP_SELLOUTS>(this.baseUrl+'Get/SellOutData',{params: {...prm}});
    }
    readBuyoutData(prm: SearchParams){
      return this.http.get<SP_BUYOUTS>(this.baseUrl+'Get/BuyOutData',{params: {...prm}});
    }
} 