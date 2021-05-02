import {AfterViewInit, Component} from '@angular/core';
import Swiper from 'swiper';
import SwiperCore, { Navigation } from 'swiper/core';

SwiperCore.use([Navigation]);

@Component({
  templateUrl: './blog-details.component.html'
})
export class BlogDetailsComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const relatedPost = new Swiper('.blog_related-slider', {
      loop: true,
      slidesPerView: 2,
      navigation: {
        nextEl: '.related-post-nav .screenshot-nav-next',
        prevEl: '.related-post-nav .screenshot-nav-prev',
      },
      spaceBetween: 30,
      breakpoints: {
        0: {
          slidesPerView: 1
        },
        991.98: {
          slidesPerView: 2
        }
      }
    });
  }
}
