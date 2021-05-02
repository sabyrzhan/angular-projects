import {AfterViewChecked, AfterViewInit, Component, Inject, Input, OnChanges} from '@angular/core';
import {IFaq} from './faq.model';
import {JQ_TOKEN} from '../../common/jquery.service';

@Component({
  selector: 'faqs',
  templateUrl: './faqs.component.html'
})
export class FaqsComponent implements OnChanges {
  @Input()
  faqs: IFaq[] = [];

  constructor(@Inject(JQ_TOKEN) private $: any) {
  }

  ngOnChanges(changes: any): void {
    if (this.faqs.length > 0) {
      this.bindAccordionEvents();
    }
  }

  private bindAccordionEvents(): void {
    setTimeout(() => {
      this.$('.card').on('hide.bs.collapse', (e: any) => {
        const parentId = this.$(e.target).parent().attr('id');
        this.$(`#${parentId} > .card-header > h5`).addClass('hidden');
      });

      this.$('.card').on('show.bs.collapse', (e: any) => {
        const parentId = this.$(e.target).parent().attr('id');
        this.$(`#${parentId} > .card-header > h5`).removeClass('hidden');
      });
    }, 500);
  }
}
