import {AfterViewInit, Component, Inject} from '@angular/core';
import {JQ_TOKEN} from '../common/jquery.service';
import {IBlog, IBlogView} from './blogs.model';
import {BlogsService} from './blogs.service';

@Component({
  templateUrl: 'blogs.component.html'
})
export class BlogsComponent implements AfterViewInit {
  blogs: IBlogView[] = [];

  constructor(@Inject(JQ_TOKEN) private $: any,
              private blogsService: BlogsService) {
  }

  ngAfterViewInit(): void {
    this.bindClickEventsToDropdowns();
    this.fetchBlogs();
  }

  fetchBlogs(): void {
    this.blogsService.fetchBlogs().subscribe(blogs => {
      let cssClass1 = 'col-lg-4';
      let cssClass2 = 'col-lg-8';
      for (let i = 0; i < blogs.length; i += 2) {
        const blog1: IBlogView = {
          blog: blogs[i],
          cssClass: cssClass1
        };
        const blog2: IBlogView = {
          blog: blogs[i + 1],
          cssClass: cssClass2
        };
        this.blogs.push(blog1, blog2);
        [cssClass1, cssClass2] = [cssClass2, cssClass1];
      }
    });
  }

  getCssClassForIndex(index: number): string {
    if (index % 2 === 0) {
      return 'col-lg-4';
    } else {
      return 'col-lg-8';
    }
  }

  bindClickEventsToDropdowns(): void {
    this.$('.category__dropdown').on('click', (e: any) => {
      if ((this.$(e.target).parents().hasClass('category__dropdown'))
          && !(this.$('.category__dropdown-box').hasClass('shown'))) {
        this.$('.category__dropdown-box').addClass('shown');
      } else if ((this.$(e.target).parents().hasClass('category__dropdown-info'))
                && (this.$('.category__dropdown-box').hasClass('shown'))) {
        this.$('.category__dropdown-box').removeClass('shown');
      }
    });

    this.$('.date__dropdown').on('click', (e: any) => {
      if ((this.$(e.target).parents().hasClass('date__dropdown'))
          && !(this.$('.date__dropdown-box').hasClass('shown'))) {
        this.$('.date__dropdown-box').addClass('shown');
      } else if ((this.$(e.target).parents().hasClass('date__dropdown-info'))
                && (this.$('.date__dropdown-box').hasClass('shown'))) {
        this.$('.date__dropdown-box').removeClass('shown');
      }
    });

    this.$(window).on('click', (e: any) => {
      if (!(this.$(e.target).parents().hasClass('category__dropdown'))) {
        this.$('.category__dropdown-box').removeClass('shown');
      }
      if (!(this.$(e.target).parents().hasClass('date__dropdown'))) {
        this.$('.date__dropdown-box').removeClass('shown');
      }
    });
  }
}
