import {Component, Inject, Input} from '@angular/core';
import {JQ_TOKEN} from '../common/jquery.service';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'nav-footer',
  templateUrl: 'nav-footer.component.html'
})
export class NavFooterComponent {
  modalId = 'modal';

  @Input()
  email = '';

  @Input()
  modalTitle = '';

  @Input()
  modalText = '';

  constructor(@Inject(JQ_TOKEN) private $: any,
              private http: HttpClient) {
  }

  subscribe(): void {
    if (this.email === '') {
      this.modalTitle = 'Error';
      this.modalText = 'Please specify email address to subscribe!';
      this.$(`#${this.modalId}`).modal({});
    } else {
      this.http.post(`/api/users/subscribe?email=${this.email}`, {})
        .pipe(tap((data: any) => true))
        .pipe(catchError(error => of(false)))
        .subscribe(result => {
          if (result !== false) {
            this.modalTitle = 'Success';
            this.modalText = 'You have been subscribed successfully!';
          } else {
            this.modalTitle = 'Error';
            this.modalText = 'Server error';
          }
          this.$(`#${this.modalId}`).modal({});
        });
    }
  }
}
