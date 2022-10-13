import { Injectable, EventEmitter } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

@Injectable({
  providedIn: "root",
})
export class GenInterConnectServiceService {
    private userInfo = new BehaviorSubject(Object);
  UserInfoAll = this.userInfo.asObservable();
  constructor(){}
  storeUserInfo(userInfo: any) {
    this.userInfo.next(userInfo);
  }
}