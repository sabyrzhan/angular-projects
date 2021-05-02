import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import Swiper from 'swiper';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import {JQ_TOKEN} from '../common/jquery.service';
import {ITestimonial} from './testimonial/testimonial.model';
import {TestimonialService} from './testimonial/testimonial.service';
import {FaqsService} from './faqs/faqs.service';
import {IFaq} from './faqs/faq.model';

SwiperCore.use([Navigation, Pagination]);

@Component({
  templateUrl: 'home.component.html'
})
export class HomeComponent implements AfterViewInit, OnInit {
  testimonials: ITestimonial[] = [];
  faqs: IFaq[] = [];

  constructor(@Inject(JQ_TOKEN) private $: any,
              private testimonialService: TestimonialService,
              private faqService: FaqsService) {
  }

  ngOnInit(): void {
    this.fetchTestimonials();
    this.fetchFaqs();
  }

  private fetchTestimonials(): void {
    this.testimonialService.fetchTestimonials().subscribe(items => {
      this.testimonials = items;
    });
  }

  private fetchFaqs(): void {
    this.faqService.fetchFaqs().subscribe(faqs => {
      this.faqs = faqs;
    });
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
  }
}
