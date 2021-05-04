import {AfterViewInit, Component, Inject} from '@angular/core';
import Swiper from 'swiper';
import SwiperCore, {Navigation} from 'swiper/core';
import {JQ_TOKEN} from '../common/jquery.service';
import {BlogsService} from '../blogs/blogs.service';
import {ActivatedRoute, Data} from '@angular/router';
import {IBlog} from '../blogs/blogs.model';

SwiperCore.use([Navigation]);

@Component({
  templateUrl: './blog-details.component.html'
})
export class BlogDetailsComponent implements AfterViewInit {
  blog: IBlog = {} as IBlog;

  constructor(@Inject(JQ_TOKEN) private $: any,
              private blogService: BlogsService,
              private route: ActivatedRoute) {
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

    this.route.params.forEach(param => {
      this.blogService.fetchBlog(param.id).subscribe(blog => {
        this.blog = blog;
      });
    });
  }
}
