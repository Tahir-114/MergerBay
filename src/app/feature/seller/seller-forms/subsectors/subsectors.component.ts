import { SectorMain } from './../../../../shared/models/Sector';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-seller-subsectors',
  templateUrl: './subsectors.component.html',
  styleUrls: ['./subsectors.component.css']
})
export class SellerSubsectorsComponent implements OnInit {
  // product = [];
  @Input() public sectorsArray: SectorMain[];
  @Input() public isDisabled: boolean = false;
  // @Input() public subSectorsItem : Array <any> = [];
  //SectoritemsArr:Array <any> = [];
  //subsectors_array:any[];

  // private _sector:any;
  // @Input() set sector(sector: any) {
  //   debugger;
  //   this._sector = sector;
  //   this.addSector(this._sector);
  //   console.log(this._sector)
  // }
  // get sector(): any { return this.sector; }

  constructor() { }

  ngOnInit(): void {
    //console.log('sectors');
    //console.log(this._sector);
    // console.log(this.subSectorsItem);
    //this.subsectors_array.push(this.subSectors.subSectorArr as [])
    //this.subSectoritemsArr=this.subSectors.subSectorArr;
  }

  // addSector(sector:any){
  //   this.SectoritemsArr.push(sector);
  // }

  // RemoveSector(sector:any){
  //   this.SectoritemsArr.slice(sector,-1);
  // }


  // customCheck(event:any)
  // {
  //   //subSectorItemArr
  //   //subSectorId
  // }


  changeSectorStatus(sectorIndex: any, subSectorIndex: any, status: boolean) {
    let sub_sector = this.sectorsArray[sectorIndex].subSectorArr[subSectorIndex];
    //this.selectedSubsector = sector;
    let subSectorItems = sub_sector.subSectorItemArr as any[];
    subSectorItems.forEach(x => {
      x.status = status;
    });
    sub_sector.subSectorItemArr = subSectorItems;
  }

  // enableSubCatsStatus(id: any, name: any) {
  //   // this.subsectors[id]
  // }
  changeCatStatus(sector: any, subsector: any, item: any) {
    console.log(this.sectorsArray[sector].subSectorArr[subsector].subSectorItemArr[item]);
    if (this.sectorsArray[sector].subSectorArr[subsector].subSectorItemArr[item]['status']) {
      this.sectorsArray[sector].subSectorArr[subsector].subSectorItemArr[item]['status'] = true;
      //Setting sub sector checked if one of the item is selected
      this.sectorsArray[sector].subSectorArr[subsector]['status'] = true;

    } else {
      this.sectorsArray[sector].subSectorArr[subsector].subSectorItemArr[item]['status'] = false
    }

    ///Uncheck Subsector if all items are unchekced
    let sub_sector = this.sectorsArray[sector].subSectorArr[subsector];
    let subSectorItems = sub_sector.subSectorItemArr as any[];
    if (!(subSectorItems.filter(x => x.status == true).length > 0)) {
      this.sectorsArray[sector].subSectorArr[subsector]['status'] = false;
    }
  }

}
