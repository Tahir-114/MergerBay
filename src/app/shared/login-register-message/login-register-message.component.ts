import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-register-message',
  templateUrl: './login-register-message.component.html',
  styleUrls: ['./login-register-message.component.css']
})
export class LoginRegisterMessageComponent implements OnInit {

  data:any;
  viewDetail:any;
  constructor(private router: Router) {
    this.data = this.router.getCurrentNavigation()?.extras?.state?.['data'];
    this.viewDetail = this.router.getCurrentNavigation()?.extras?.state?.['detail'];

    console.log(this.data); // should log out 'bar'
    if(this.data) sessionStorage.setItem('model-data',this.data);
    
    if(this.viewDetail) sessionStorage.setItem('view-detail',this.viewDetail);

    

  }

  ngOnInit(): void {
  }

}
