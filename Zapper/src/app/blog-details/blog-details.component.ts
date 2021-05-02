import {AfterViewInit, Component, Inject} from '@angular/core';
import Swiper from 'swiper';
import SwiperCore, { Navigation } from 'swiper/core';
import {JQ_TOKEN} from '../common/jquery.service';

SwiperCore.use([Navigation]);

@Component({
  templateUrl: './blog-details.component.html'
})
export class BlogDetailsComponent implements AfterViewInit {
  constructor(@Inject(JQ_TOKEN) private $: any) {
  }

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

    this.initMasonryLayout();
  }

  private initMasonryLayout(): void {
    this.$(window).on('load', () => {
      this.$('body').addClass('loaded');
      this.$('.grid').masonry({
        itemSelector: '.grid-item',
        gutter: 30
      });
    });
  }
}
