import {AfterViewInit, Component, Inject} from '@angular/core';
import Swiper from 'swiper';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import {JQ_TOKEN} from '../common/jquery.service';

SwiperCore.use([Navigation, Pagination]);

@Component({
  templateUrl: 'home.component.html'
})
export class HomeComponent implements AfterViewInit {
  constructor(@Inject(JQ_TOKEN) private $: any) {
  }

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

    this.bindTestimonialMouseOver();
    this.bindAccordionEvents();
  }

  private bindTestimonialMouseOver(): void {
    this.$('.testimonial__wrapper').on('mouseover click', (e: any) => {
      if (this.$(e.target).is('img')) {
        const parentElement = this.$(e.target).parent().parent();
        parentElement.addClass('active');
        if (parentElement.siblings().hasClass('active')) {
          parentElement.siblings().removeClass('active');
        }
      }
    });
  }

  private bindAccordionEvents(): void {
    this.$('.card').on('hide.bs.collapse', (e: any) => {
      const parentId = this.$(e.target).parent().attr('id');
      this.$(`#${parentId} > .card-header > h5`).addClass('hidden');
    });

    this.$('.card').on('show.bs.collapse', (e: any) => {
      const parentId = this.$(e.target).parent().attr('id');
      this.$(`#${parentId} > .card-header > h5`).removeClass('hidden');
    });
  }
}
