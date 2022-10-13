import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { GenInterConnectServiceService } from '../services/interconnected/inter.connected';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // user_login = false;
  user_login = false;
  username:any;
  constructor(private router: Router,private interconnected:GenInterConnectServiceService) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        window.scroll(0, 100);
        window.scroll(0, 0);
      } else {
        window.scroll(0, 100);
        window.scroll(0, 0);
      }
    });
  }

  ngOnInit(): void {
    this.interconnected.UserInfoAll.subscribe(async (user:any) => {
      this.username=user.userName;
      this.user_login=true;
      if(!this.username && !localStorage.getItem('username'))
      {
        this.user_login=false;
      }
      localStorage.getItem('username')? this.username=localStorage.getItem('username'):'';
    });
    
  }

  signOut()
  {
    this.user_login=false;
    localStorage.removeItem('username');
    localStorage.removeItem('usertoken');
    localStorage.removeItem('userId');
    this.router.navigate(['/']);
  }

}
