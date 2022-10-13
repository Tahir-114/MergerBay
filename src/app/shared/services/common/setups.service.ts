import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { SectorMain } from '../../models/Sector';
import { GlobalServiceService } from '../global/global.service';

@Injectable({
  providedIn: 'root'
})
export class SetupService {

  constructor(private http: HttpClient ) { }

  baseUrl_Get  = GlobalServiceService.ApiUrl+"Setups/Get/";
  baseUrl_Save  = GlobalServiceService.ApiUrl+"Setups/Save/";
  
  //#region Setup Lists cache
  sectors_interested: SectorMain[] = [];
  countries_list: any[]  = [];
  cities_list: any[]  = [];
  year_establishments: any[] = [];
  transaction_roles: any[] = [];
  ownershipt_pref: any[] = [];
  properties_list: any[] = [];
  contractDurations_list: any[] = [];
  revenue_preferences:any = [];
  transaction_types:any = [];
  recommended_deals:any = [];
  DefualtCurrency:any;
  //#endregion

  //#region  Get Methods
   getCoutries() {
    if(this.countries_list.length > 0) return of(this.countries_list);
    return this.http.get(this.baseUrl_Get+"Countries").pipe(
      map(res => {
         this.countries_list =  res as any[];
         return res;
      })
    );
  }
  getCities(countryId: any) {
    //if(this.countries_list.length > 0) return of(this.countries_list);
    return this.http.get(this.baseUrl_Get+"Cities/"+ countryId).pipe(
      map(res => {
         this.cities_list =  res as any[];
         return res;
      })
    );
  }
  getSectors() {
    if(this.sectors_interested.length > 0) return of(this.sectors_interested);
    return this.http.get(this.baseUrl_Get+"Sectors").pipe(
      map(res => {
         this.sectors_interested =  res as SectorMain[];
         return res;
      })
    );
  }
  getTransactionRoles(){
    if(this.transaction_roles.length > 0) return of(this.transaction_roles);
    return this.http.get(this.baseUrl_Get+"TransactionRoles").pipe(
      map(res => {
         this.transaction_roles =  res as any[];
         return res;
      })
    );
  }
  getOwnerShipPreference(){
    if(this.ownershipt_pref.length > 0) return of(this.ownershipt_pref);
    return this.http.get(this.baseUrl_Get+"OwnerShipPrefs").pipe(
      map(res => {
         this.ownershipt_pref =  res as any[];
         return res;
      })
    );
  }
  getYearEstablishMents(){
    if(this.year_establishments.length > 0) return of(this.year_establishments);
    return this.http.get(this.baseUrl_Get+"EstablishmentYears").pipe(
      map(res => {
         this.year_establishments =  res as any[];
         return res;
      })
    );
  }
  getSubSectors(){
    return this.http.get(this.baseUrl_Get+"SubSectors");
  }
  getProperties(){
    if(this.properties_list.length > 0) return of(this.properties_list);
    return this.http.get(this.baseUrl_Get+"Properties").pipe(
      map(res => {
         this.properties_list =  res as any[];
         return res;
      })
    );
  }
  getContractDurations(){
    if(this.contractDurations_list.length > 0) return of(this.contractDurations_list);
    return this.http.get(this.baseUrl_Get+"ContractDurations").pipe(
      map(res => {
         this.contractDurations_list =  res as any[];
         return res;
      })
    );
  }
  getRevenuePreferences(){
    if(this.revenue_preferences.length > 0) return of(this.revenue_preferences);
    return this.http.get(this.baseUrl_Get+"RevenuePreferences").pipe(
      map(res => {
         this.revenue_preferences =  res as any[];
         return res;
      })
    );
  }
  getTransactionTypes(){
    if(this.transaction_types.length > 0) return of(this.transaction_types);
    return this.http.get(this.baseUrl_Get+"TransactionTypes").pipe(
      map(res => {
         this.transaction_types =  res as any[];
         return res;
      })
    );
  }
  getDefaultCurrency(){
      if(this.DefualtCurrency) return of(this.DefualtCurrency);
      return this.http.get(this.baseUrl_Get+"DefaultCurrency").pipe(
        map(res => {
          this.DefualtCurrency =  res;
          return res;
        })
      )
    }  
    getRecommendedDeals(){
      if(this.recommended_deals.length > 0) return of(this.recommended_deals);
      return this.http.get(this.baseUrl_Get+"RecommendedDeal").pipe(
        map(res => {
           this.recommended_deals =  res as any[];
           return res;
        })
      );
    }

    //#region 

    //#region  Post Methods
    saveRecommendedDeals(model:any){
      return this.http.post(this.baseUrl_Save+"RecommendedDeal",model,{responseType: 'text'});
    }

    //#endregion
}
