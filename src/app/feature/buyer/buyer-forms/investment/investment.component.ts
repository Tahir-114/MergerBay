import { FormTypeEnum } from 'src/app/shared/enums/form-type';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['../buyer-forms.component.css']
})
export class InvestmentComponent implements OnInit {

  FormType = FormTypeEnum.Investment;

  constructor() { }

  ngOnInit(): void {
  }


}
