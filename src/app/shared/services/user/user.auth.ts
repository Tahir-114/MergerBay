import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GlobalServiceService } from "../global/global.service";

@Injectable({
  providedIn: "root",
})
export class UserAuthService {
  constructor(
    private http: HttpClient
  ) {}
  baseUrl: string = GlobalServiceService.ApiUrl;
  userSignUp(obj:any) {
    console.log(obj);
    return this.http.post(this.baseUrl + `UserManagement/UserPersonalInformation`, obj);
  }

  saveUserProfile(obj:any) {
    console.log(obj);
    return this.http.post(this.baseUrl + `UserProfile/save/profile`, obj);
  }

  saveCompanyInformation(obj:any) {
    console.log(obj);
    return this.http.post(this.baseUrl + `UserProfile/save/companyprofile`, obj);
  }

  getUserProfile(obj:any) {
    console.log(obj);
    return this.http.post(this.baseUrl + `UserProfile/get/profile`, obj);
  }

  getCategory(obj:any) {
    console.log(obj);
    return this.http.post(this.baseUrl + `UserProfile/get/companycategory`, obj);
  }



  getCompanyInformation(obj:any) {
    console.log(obj);
    return this.http.post(this.baseUrl + `UserProfile/get/companyprofile`, obj);
  }



  uploadProfilePictures(obj:any) {
    console.log(obj);
    return this.http.post(this.baseUrl + `UserProfile/save/profilepic`, obj);
  }

  uploadCardsPictures(obj:any) {
    console.log(obj);
    return this.http.post(this.baseUrl + `UserProfile/save/cardattachments`, obj);
  }

  uploadCertificatePictures(obj:any) {
    console.log(obj);
    return this.http.post(this.baseUrl + `UserProfile/save/certificateattachments`, obj);
  }


  userSignIn(obj:any) {
    return this.http.post(this.baseUrl + `Authentication/login`, obj);
  }
}