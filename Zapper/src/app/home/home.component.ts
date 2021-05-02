import {AfterViewInit, Component} from '@angular/core';
import Swiper from 'swiper';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';

SwiperCore.use([Navigation, Pagination]);

@Component({
  templateUrl: 'home.component.html'
})
export class HomeComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const clients = new Swiper('.clients-slider', {
      loop: true,
      autoplay: true,
      slidesPerView: 1,
      breakpoints: {
        991.98: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 2,
        }
      }
    });

    const screenshot = new Swiper('.screenshot-slider', {
      loop: true,
      slidesPerView: 4.75,
      centeredSlides: true,
      spaceBetween: 30,
      navigation: {
        nextEl: '.screenshot-nav-next',
        prevEl: '.screenshot-nav-prev',
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        991.98: {
          slidesPerView: 2.75,
        },
        1200: {
          slidesPerView: 3.25,
        },
        1350: {
          slidesPerView: 3.5,
        },
        1600: {
          slidesPerView: 3.90,
        },
        1800: {
          slidesPerView: 4.75,
        }
      }
    });
  }
}
