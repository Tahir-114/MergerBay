import { Injectable } from '@angular/core';
import { useAnimation } from '@angular/animations';

@Injectable({
  providedIn: "root"
})
export class GlobalServiceService {
static ApiUrl: string = 'https://localhost:7065/api/';
 //static ApiUrl: string = 'https://mergerbayservertest1.azurewebsites.net/api/';
  static user_token:string='';
  static email_sys:string='';
  static userName_sys:string='';
  constructor()
  {

  }
  get ApiUrl(): string {
    return GlobalServiceService.ApiUrl;
  }
  get userToken(): string {
    return GlobalServiceService.user_token;
  }
  get email(): string {
    return GlobalServiceService.email_sys;
  }
  get userName(): string {
    return GlobalServiceService.userName_sys;
  }
    }