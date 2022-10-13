import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GlobalServiceService } from "../global/global.service";
import { Observable } from "rxjs";
import { SectorMain } from "../../models/Sector";

@Injectable({
  providedIn: "root",
})
export class Sectorervice {
  constructor(
    private http: HttpClient
  ) {}
  baseUrl: string = GlobalServiceService.ApiUrl;
  getsectors(obj:any) {
    return this.http.post(this.baseUrl + `Setups/Get/Sectors`,obj);
  }
  postsectors(obj:any) {
    return this.http.post(this.baseUrl + `Authentication/login`, obj);
  }

  public static GetOnlySelectedSectors(sectorsArray :SectorMain[]){
    // const sectorsSelected:SectorMain[]  = sectorsArray;
    const sectorsSelected:SectorMain[] = JSON.parse(JSON.stringify(sectorsArray)) as SectorMain[];
    //Object.assign(sectorsSelected, this.sectorsArr);
    // let main:SectorMain; 
    // let detail:SectorDetail;
    // let item:SectorDetail_Items;
    //return this.sectorsArr.filter(x => x.subSectorArr.filter(x => x.status ==true).filter(y => y.subSectorItemArr.filter(z => z.status == true)));
    
    sectorsSelected.forEach(x=>{    
      //select subsectors checked(i.e status =  true) and has items in it
    x.subSectorArr =  x.subSectorArr.filter(x => x.status == true && x.subSectorItemArr.length>0); 
    x.subSectorArr.forEach(y => {
       y.subSectorItemArr = y.subSectorItemArr.filter(x => x.status == true); //which select only selected items 
      })
   });
   return sectorsSelected;
  }
}