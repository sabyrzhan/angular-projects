import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IFaq} from './faq.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class FaqsService {
  constructor(private http: HttpClient) {
  }

  fetchFaqs(): Observable<IFaq[]> {
    return this.http.get<IFaq[]>('/api/faqs');
  }
}
