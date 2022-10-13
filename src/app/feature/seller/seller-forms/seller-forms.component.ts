import { Component, OnInit } from '@angular/core';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-seller-forms',
  templateUrl: './seller-forms.component.html',
  styleUrls: ['./seller-forms.component.css']
})
export class SellerFormsComponent implements OnInit {

  ind_page = false;
  tab1 = false;
  tab2 = false;
  tab3 = false;
  tab4 = false;

  constructor(private url: LocationStrategy) {
    document.body.classList.add('theme_2');
  }

  ngOnInit(): void {
    if (this.url.path() === '/seller/seller-form/sell-out') {
      this.ind_page = true;
      this.tab1 = true;
    }
    if (this.url.path() === '/seller/seller-form/investment') {
      this.ind_page = true;
      this.tab2 = true;
    }
    if (this.url.path() === '/seller/seller-form/mergers-acquisitions') {
      this.ind_page = true;
      this.tab3 = true;
    }
    if (this.url.path() === '/seller/seller-form/commercial-property') {
      this.ind_page = true;
      this.tab4 = true;
    }
  }

  ngOnDestroy(): void {
    document.body.classList.remove('theme_2');
  }

}
