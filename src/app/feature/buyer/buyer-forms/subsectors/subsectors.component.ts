import { Component, Input, OnInit } from '@angular/core';
import { SectorMain } from 'src/app/shared/models/Sector';
import { Sectorervice } from 'src/app/shared/services/sectors/sectors.services';

@Component({
  selector: 'app-buyer-subsectors',
  templateUrl: './subsectors.component.html',
  styleUrls: ['./subsectors.component.css']
})
export class BuyerSubsectorsComponent implements OnInit {
  @Input() public sectorsArray : SectorMain[];
  @Input() public isDisabled :boolean = false;
  


  constructor() { }

  ngOnInit(): void {}
  
  changeSectorStatus(sectorIndex:any, subSectorIndex:any,status:boolean){
    let sub_sector = this.sectorsArray[sectorIndex].subSectorArr[subSectorIndex];
    //this.selectedSubsector = sector;
    let subSectorItems = sub_sector.subSectorItemArr as any[];
    subSectorItems.forEach(x =>  {
      x.status = status;
   });
   sub_sector.subSectorItemArr = subSectorItems;
  }

  // enableSubCatsStatus(id: any, name: any) {
  //   // this.subsectors[id]
  // }
  changeCatStatus(sector: any,subsector:any, item: any) {
    console.log(this.sectorsArray[sector].subSectorArr[subsector].subSectorItemArr[item]);
    if(this.sectorsArray[sector].subSectorArr[subsector].subSectorItemArr[item]['status']) {
      this.sectorsArray[sector].subSectorArr[subsector].subSectorItemArr[item]['status']  = true;
      //Setting sub sector checked if one of the item is selected
      this.sectorsArray[sector].subSectorArr[subsector]['status']  = true;
      
    } else {
      this.sectorsArray[sector].subSectorArr[subsector].subSectorItemArr[item]['status']  = false
    }

    ///Uncheck Subsector if all items are unchekced
    let sub_sector = this.sectorsArray[sector].subSectorArr[subsector];
    let subSectorItems = sub_sector.subSectorItemArr as any[];
    if(!(subSectorItems.filter(x =>x.status == true).length > 0)) {
      this.sectorsArray[sector].subSectorArr[subsector]['status']  = false;
    }

  }

}
