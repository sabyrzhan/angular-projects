import {Component, Inject, OnInit} from '@angular/core';
// import Swiper JS
import Swiper from 'swiper';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import {JQ_TOKEN} from '../../shared/jqyery.service';

SwiperCore.use([Navigation, Pagination]);

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  constructor(@Inject(JQ_TOKEN) private $: any) {
  }

  offCanvasInit(): void {
    const $offCanvasNav = this.$('.mobile-menu, .category-menu');
    const $offCanvasNavSubMenu = $offCanvasNav.find('.dropdown');

    // Close Off Canvas Sub Menu
    $offCanvasNavSubMenu.slideUp();

    // Category Sub Menu Toggle
    $offCanvasNav.on('click', 'li a, li .menu-expand', (e: any) =>  {
      const $this = this.$(this);
      if ( ($this.parent().attr('class').match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/)) &&
          ($this.attr('href') === '#' || $this.hasClass('menu-expand')) ) {
        e.preventDefault();
        if ($this.siblings('ul:visible').length){
          $this.parent('li').removeClass('active');
          $this.siblings('ul').slideUp();
        } else {
          $this.parent('li').addClass('active');
          $this.closest('li').siblings('li').removeClass('active').find('li').removeClass('active');
          $this.closest('li').siblings('li').find('ul:visible').slideUp();
          $this.siblings('ul').slideDown();
        }
      }
    });
  }

  ngOnInit(): void {
    this.offCanvasInit();

    /* Hero Slider Activation */
    const swiper = new Swiper('.hero-slider .swiper-container', {
      loop: true,
      speed: 1150,
      spaceBetween: 30,
      slidesPerView: 1,
      effect: 'fade',

      // Navigation arrows
      navigation: {
        nextEl: '.hero-slider .home-slider-next',
        prevEl: '.hero-slider .home-slider-prev'
      },
      pagination: {
        el: '.hero-slider .swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      // Responsive breakpoints
    });

    /* Product Carousel Activation */
    const productCarousel = new Swiper('.product-carousel .swiper-container', {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 0,
      observer: true,
      observeParents: true,

      navigation: {
        nextEl: '.product-carousel .swiper-product-button-next',
        prevEl: '.product-carousel .swiper-product-button-prev'
      },
      pagination: {
        el: '.product-carousel .swiper-pagination',
        type: 'bullets',
        clickable: true
      },

      // Responsive breakpoints
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 1,
        },
        // when window width is >= 575px
        575: {
          slidesPerView: 2,
        },
        // when window width is >= 768px
        768: {
          slidesPerView: 2,
        },
        // when window width is >= 992px
        992: {
          slidesPerView: 3,
        },
        // when window width is >= 1200px
        1200: {
          slidesPerView: 4,
        }
      }
    });
    /* Modal Product Carousel Activation */
    const productCarousel2 = new Swiper('.modal-product-carousel .swiper-container', {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 0,
      pagination: false,
      observer: true,
      observeParents: true,

      navigation: {
        nextEl: '.modal-product-carousel .swiper-product-button-next',
        prevEl: '.modal-product-carousel .swiper-product-button-prev'
      }
    });

    /* Product Deal Crousel Activation */
    const productCarousel3 = new Swiper('.product-deal-carousel .swiper-container', {
      loop: true,
      slidesPerView: 2,
      spaceBetween: 0,
      observer: true,
      observeParents: true,

      navigation: {
        nextEl: '.product-deal-carousel .swiper-product-deal-next',
        prevEl: '.product-deal-carousel .swiper-product-deal-prev'
      },
      pagination: {
        el: '.product-deal-carousel .swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 1,
        },
        // when window width is >= 575px
        575: {
          slidesPerView: 1,
        },
        // when window width is >= 768px
        768: {
          slidesPerView: 2,
        }
      }
    });

    /* Product List Crousel Activation */
    const productCarousel4 = new Swiper('.product-list-carousel .swiper-container', {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 0,
      pagination: false,
      observer: true,
      observeParents: true,

      navigation: {
        nextEl: '.product-list-carousel .swiper-product-list-next',
        prevEl: '.product-list-carousel .swiper-product-list-prev'
      },
      // pagination: {
      // 	el: '.product-list-carousel .swiper-pagination',
      // 	type: 'bullets',
      // 	clickable: 'true'
      // }
    });
    const productCarousel5 = new Swiper('.product-list-carousel-2 .swiper-container', {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 0,
      pagination: false,
      observer: true,
      observeParents: true,

      navigation: {
        nextEl: '.product-list-carousel-2 .swiper-product-list-next',
        prevEl: '.product-list-carousel-2 .swiper-product-list-prev'
      },
      // pagination: {
      // 	el: '.product-list-carousel-2 .swiper-pagination',
      // 	type: 'bullets',
      // 	clickable: 'true'
      // }
    });
    const productCarousel6 = new Swiper('.product-list-carousel-3 .swiper-container', {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 0,
      pagination: false,
      observer: true,
      observeParents: true,

      navigation: {
        nextEl: '.product-list-carousel-3 .swiper-product-list-next',
        prevEl: '.product-list-carousel-3 .swiper-product-list-prev'
      }
    });

    /*-- Brand Logo --*/
    const brandCarousel = new Swiper('.brand-logo-carousel .swiper-container', {
      loop: true,
      speed: 750,
      spaceBetween: 30,
      slidesPerView: 5,
      effect: 'slide',
      // autoplay: {},

      // Responsive breakpoints
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 3,
          spaceBetween: 30
        },
        // when window width is >= 768px
        768: {
          slidesPerView: 4,
          spaceBetween: 30
        },
        // when window width is >= 992px
        992: {
          slidesPerView: 5,
          spaceBetween: 30
        }
      }
    });

    /*-- Single product with Thumbnail Vertical -- */
    const zoomThumb = new Swiper('.product-thumb-vertical', {
      spaceBetween: 0,
      slidesPerView: 4,
      direction: 'vertical',
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      // Responsive breakpoints
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 2,
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 3,
        },
        // when window width is >= 575px
        575: {
          slidesPerView: 3,
        },
        // when window width is >= 767px
        767: {
          slidesPerView: 3,
        },
        // when window width is >= 991px
        991: {
          slidesPerView: 3,
        },
        // when window width is >= 1200px
        1200: {
          slidesPerView: 4,
        },
      }
    });
    const zoomTop = new Swiper('.single-product-vertical-tab', {
      spaceBetween: 10,
      loop: true,
      navigation: {
        nextEl: '.product-thumb-vertical .swiper-button-vertical-next',
        prevEl: '.product-thumb-vertical .swiper-button-vertical-prev',
      },
      thumbs: {
        swiper: zoomThumb
      }
    });

    /*-- Single product with Thumbnail Horizental -- */
    const galleryThumbs = new Swiper('.single-product-thumb', {
      spaceBetween: 10,
      slidesPerView: 4,
      // loop: false,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      // Responsive breakpoints
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 2,
        },
        // when window width is >= 575px
        575: {
          slidesPerView: 3,
        },
        // when window width is >= 767px
        767: {
          slidesPerView: 4,
        },
        // when window width is >= 991px
        991: {
          slidesPerView: 3,
        },
        // when window width is >= 1200px
        1200: {
          slidesPerView: 4,
        },
      }
    });
    const galleryTop = new Swiper('.single-product-img', {
      spaceBetween: 10,
      loop: true,
      navigation: {
        nextEl: '.single-product-thumb, .swiper-button-horizental-next',
        prevEl: '.single-product-thumb, .swiper-button-horizental-prev',
      },
      // loop: true,
      // loopedSlides: 5, //looped slides should be the same
      thumbs: {
        swiper: galleryThumbs,
      },
    });
  }
}
