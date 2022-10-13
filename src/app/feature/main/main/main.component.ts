import { Component, OnInit } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';

declare const customJs: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  slides = [
    { type: 'acquired', img: "../../../../assets/images/acquired_tag.png", title: 'Restaurant chain with Rev/EBITDA', desc: 'USD 26M/USD 3M seeking buyers.', user: '125693' },
    { type: 'sold', img: "../../../../assets/images/sold_tag.png", title: 'Restaurant chain with Rev/EBITDA', desc: 'USD 26M/USD 3M seeking buyers.', user: '125693' },
    { type: 'acquired', img: "../../../../assets/images/acquired_tag.png", title: 'Restaurant chain with Rev/EBITDA', desc: 'USD 26M/USD 3M seeking buyers.', user: '125693' },
    { type: 'sold', img: "../../../../assets/images/sold_tag.png", title: 'Restaurant chain with Rev/EBITDA', desc: 'USD 26M/USD 3M seeking buyers.', user: '125693' },
    { type: 'acquired', img: "../../../../assets/images/acquired_tag.png", title: 'Restaurant chain with Rev/EBITDA', desc: 'USD 26M/USD 3M seeking buyers.', user: '125693' },
    { type: 'sold', img: "../../../../assets/images/sold_tag.png", title: 'Restaurant chain with Rev/EBITDA', desc: 'USD 26M/USD 3M seeking buyers.', user: '125693' },
  ];
  slideConfig = {
    centerMode: true,
    // centerPadding: '120px',
    centerPadding: '0',
    slidesToShow: 3,
    prevArrow: '<button class="slide-arrow prev-arrow"><img src="../../../../assets/images/prev-arrow.png" class="img-fluid" alt="Prev Arrow" ></button>',
    nextArrow: '<button class="slide-arrow next-arrow"><img src="../../../../assets/images/next-arrow.png" class="img-fluid" alt="Next Arrow" ></button>',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          arrows: true,
          centerMode: true,
          // centerPadding: '30px',
          centerPadding: '0',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 992,
        settings: {
          arrows: true,
          centerMode: true,
          // centerPadding: '20px',
          centerPadding: '0',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          centerMode: true,
          // centerPadding: '0px',
          centerPadding: '0',
          slidesToShow: 1
        }
      }
    ]
  };

  partners = [
    {img: '../../../../assets/images/p1.png'},
    {img: '../../../../assets/images/p2.png'},
    {img: '../../../../assets/images/p3.png'},
    {img: '../../../../assets/images/p4.png'},
    {img: '../../../../assets/images/p5.png'},
    {img: '../../../../assets/images/p6.png'},
    {img: '../../../../assets/images/p7.png'},
    {img: '../../../../assets/images/p1.png'},
    {img: '../../../../assets/images/p2.png'},
    {img: '../../../../assets/images/p3.png'},
    {img: '../../../../assets/images/p4.png'},
    {img: '../../../../assets/images/p5.png'},
    {img: '../../../../assets/images/p6.png'},
    {img: '../../../../assets/images/p7.png'}
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

  }

  addSlide() {
    // this.slides.push({ img: "http://placehold.it/350x150/777777" })
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e: any) {
    console.log('slick initialized', e);
  }

  breakpoint(e: any) {
    console.log('breakpoint', e);
  }

  afterChange(e: any) {
    console.log('afterChange', e);
  }

  beforeChange(e: any) {
    console.log('beforeChange', e);
  }

}