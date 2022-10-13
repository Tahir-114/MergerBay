import { SearchParams } from './../../../shared/models/SearchParams';
import { SellerService } from 'src/app/shared/services/seller/seller.service';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { FormTypeEnum } from 'src/app/shared/enums/form-type';
import { SP_BUYOUTS } from 'src/app/shared/models/SP_BUYOUTS';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit {


  constructor() { }

  // slides = [
  //   { type: 'acquired', img: "../../../../assets/images/acquired_tag.png", title: 'Restaurant chain with Rev/EBITDA', desc: 'USD 26M/USD 3M seeking buyers.', user: '125693' },
  //   { type: 'acquired', img: "../../../../assets/images/acquired_tag.png", title: 'Restaurant chain with Rev/EBITDA', desc: 'USD 26M/USD 3M seeking buyers.', user: '125693' },
  //   { type: 'acquired', img: "../../../../assets/images/acquired_tag.png", title: 'Restaurant chain with Rev/EBITDA', desc: 'USD 26M/USD 3M seeking buyers.', user: '125693' },
  //   { type: 'acquired', img: "../../../../assets/images/acquired_tag.png", title: 'Restaurant chain with Rev/EBITDA', desc: 'USD 26M/USD 3M seeking buyers.', user: '125693' },
  //   { type: 'acquired', img: "../../../../assets/images/acquired_tag.png", title: 'Restaurant chain with Rev/EBITDA', desc: 'USD 26M/USD 3M seeking buyers.', user: '125693' },
  //   { type: 'acquired', img: "../../../../assets/images/acquired_tag.png", title: 'Restaurant chain with Rev/EBITDA', desc: 'USD 26M/USD 3M seeking buyers.', user: '125693' },
  // ];
  slideConfig = {
    centerMode: true,
    centerPadding: '120px',
    slidesToShow: 3,
    prevArrow: '<button class="slide-arrow prev-arrow"><img src="../../../../assets/images/prev-arrow.png" class="img-fluid" alt="Prev Arrow" ></button>',
    nextArrow: '<button class="slide-arrow next-arrow"><img src="../../../../assets/images/next-arrow.png" class="img-fluid" alt="Next Arrow" ></button>',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: '30px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 992,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: '20px',
          slidesToShow: 1
        }
      },
      {
        breakpoint: 576,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: '0px',
          slidesToShow: 1
        }
      }
    ]
  };

  partners = [
    { img: '../../../../assets/images/p1.png' },
    { img: '../../../../assets/images/p2.png' },
    { img: '../../../../assets/images/p3.png' },
    { img: '../../../../assets/images/p4.png' },
    { img: '../../../../assets/images/p5.png' },
    { img: '../../../../assets/images/p6.png' },
    { img: '../../../../assets/images/p7.png' },
    { img: '../../../../assets/images/p1.png' },
    { img: '../../../../assets/images/p2.png' },
    { img: '../../../../assets/images/p3.png' },
    { img: '../../../../assets/images/p4.png' },
    { img: '../../../../assets/images/p5.png' },
    { img: '../../../../assets/images/p6.png' },
    { img: '../../../../assets/images/p7.png' }
  ]
  config_partners = {
    centerMode: true,
    centerPadding: '0',
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    prevArrow: '',
    nextArrow: '',
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '0',
          slidesToShow: 4
        }
      },
      {
        breakpoint: 481,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '0',
          slidesToShow: 2
        }
      }
    ]
  };
  ngOnInit(): void {
    Highcharts.chart('business_chart', this.setOptions);
  }

  public setOptions: any = {
    colors: ['#0B2F5A'],
    chart: {
      type: 'column',
      style: {
        // fontFamily: 'sans-serif',
        color: '#fff'
      }
      // backgroundColor: '#36394B'
    },
    title: {
      text: '',
      style: {
        color: '#fff'
      }
    },
    xAxis: {
      categories: [''],
      title: {
        text: null
      },
      labels: { enabled: false, y: 20, align: 'right' }

    },
    yAxis: {
      gridLineWidth: .5,
      gridLineDashStyle: 'dash',
      gridLineColor: 'black',
      title: {
        text: '',
        style: {
          color: '#fff'
        }
      },
      // labels: {
      //   formatter: function() {
      //     return Highcharts.numberFormat(this.this.value, 0, '', ',');
      //   },
      //   style: {
      //     color: '#3E4581',
      //   }
      // }
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false
    },
    tooltip: {
      valuePrefix: ''
    },
    plotOptions: {
      series: {
        pointWidth: 10,
        stacking: 'normal',
        borderWidth: 0,
        borderColor: 'black'
      },
      column: {
        borderRadius: 0,
        pointPadding: 0,
        groupPadding: 0.05
      }
    },
    series: [{
      name: 'People',
      data: [
        690,
        938,
        612,
        4250,
        2852,
        1002,
        728,
        1156,
        956,
        4487
      ]
    }]
  }

}
