import { FormTypeEnum } from './../../shared/enums/form-type';
import { ToastrService } from 'ngx-toastr';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/forms/form-seller.service';
import { GlobalServiceService } from 'src/app/shared/services/global/global.service';
import { GenInterConnectServiceService } from 'src/app/shared/services/interconnected/inter.connected';
import { SellerService } from 'src/app/shared/services/seller/seller.service';
import { UserAuthService } from 'src/app/shared/services/user/user.auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  show_password = false;
  signInForm:FormGroup;
  @ViewChild('password') password: ElementRef;
  submitted:boolean=false;
  emailErrorMessage:string='';
  passwordErrorMessage:string='';
  constructor(private form: FormService,private userAuth:UserAuthService, private router: Router,private builder: FormBuilder,private interconnected:GenInterConnectServiceService,
    private toaster: ToastrService,
    private _seller: SellerService) {}
  ngOnInit(): void {
    this.signInForm=this.form.initLoginForm();
  }
  get email() { return this.signInForm.get('emaillogin'); }
  get password1() { return this.signInForm.get('passwordlogin'); }
  loginUser = async (): Promise<void> => {
    debugger;
    this.submitted=true;
    this.emailErrorMessage='';
    this.passwordErrorMessage='';
    let formLogin=this.signInForm.value;
    if(this.signInForm.valid)
    {
      const body = {
        userName: formLogin.emaillogin,
        password:formLogin.passwordlogin,
      }
    this.userAuth
      .userSignIn(body)
      .subscribe(
        (data:any) => {
          console.log(data);
          
          data['message'] == 'User does not exists' ? this.emailErrorMessage=data['message']:this.emailErrorMessage='';
          data['message'] == 'Wrong password' ? this.passwordErrorMessage=data['message']:this.passwordErrorMessage='';
          if(this.emailErrorMessage != 'User does not exists' && data['message'] != 'Wrong password')
          {

            debugger;
            GlobalServiceService.user_token=data.user_Token;
            GlobalServiceService.email_sys=data.email;
            GlobalServiceService.userName_sys=data.userName;
            localStorage.setItem('usertoken',data.user_Token);
            localStorage.setItem('username',data.userName);
            localStorage.setItem('userId',data.user_Id);
            this.interconnected.storeUserInfo(data);
            setTimeout(() =>{
              this.saveDraftData(data.user_Id);
            })

            //Go to View Detail Page if user clicked on ViewDetails
            // var view_details  = sessionStorage.getItem('view-detail');
            // if(view_details){
            //   this.nevigateToReviewPage(view_details);
            // }
          }
        
        },
        (error) => {
        }
      );
    }
    else{
      alert('please fill all required fields.')
    }

    }
    saveDraftData(userId: string){ 
      debugger;
      var res  = sessionStorage.getItem('model-data');
      var view_details  = sessionStorage.getItem('view-detail');
     //Go to View Detail Page if user clicked on ViewDetails
      if(res){
         let data = JSON.parse(res);
          data.UserId = userId;
          data.Status = "Pending";
          if(data.type == FormTypeEnum.Buy){
            this.saveBuyoutData(data);
          }else{
            this.saveSelloutData(data);
          }
        }
        else if(view_details){
            let detail = JSON.parse(view_details);  
            this.nevigateToReviewPage(detail);
            return;
        }
        this.router.navigate(['/propositions']);
    }
    saveSelloutData(data:any){
      this._seller.saveSellOutForm(data).subscribe(x => {
        sessionStorage.removeItem('model-data');
        localStorage.removeItem('form-data');  
        this.toaster.info("Your Preposition has been Saved","Information")
      })  
    }
    saveBuyoutData(data:any){
      this._seller.saveBayOutForm(data).subscribe(x => {
        sessionStorage.removeItem('model-data');
        localStorage.removeItem('form-data');  
        this.toaster.info("Your Preposition has been Saved","Information")
      })  
    }

    nevigateToReviewPage(detail:any){
      if(detail.type && detail.formId){
        sessionStorage.removeItem('view-detail');
        this.router.navigate(['/propotion-reivew',detail.type,detail.formId]);
      }else{
        this.router.navigate(['/propositions']);
      }
    }
}
