import {AfterViewInit, Component, Inject} from '@angular/core';
import {JQ_TOKEN} from '../common/jquery.service';

@Component({
  templateUrl: 'blogs.component.html'
})
export class BlogsComponent implements AfterViewInit {
  constructor(@Inject(JQ_TOKEN) private $: any) {
  }

  ngAfterViewInit(): void {
    this.bindClickEventsToDropdowns();
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
