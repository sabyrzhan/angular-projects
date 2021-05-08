import {Component, Inject, Input, OnChanges} from '@angular/core';
import {ITestimonial} from './testimonial.model';
import {JQ_TOKEN} from '../../common/jquery.service';

@Component({
  selector: 'testimonial',
  templateUrl: './testimonial.component.html'
})
export class TestimonialComponent implements OnChanges {
  @Input()
  testimonials: ITestimonial[] = [];

  constructor(@Inject(JQ_TOKEN) private $: any) {
  }

  ngOnChanges(changes: any): void {
    if (this.testimonials.length > 0) {
      this.bindTestimonialMouseOver();
    }
  }

  private bindTestimonialMouseOver(): void {
    setTimeout(() => {
      this.$('.testimonial__wrapper').on('mouseover click', (e: any) => {
        if (this.$(e.target).is('img')) {
          const parentElement = this.$(e.target).parent().parent();
          parentElement.addClass('active');
          if (parentElement.siblings().hasClass('active')) {
            parentElement.siblings().removeClass('active');
          }
        }
      });
    }, 500);
  }
}
