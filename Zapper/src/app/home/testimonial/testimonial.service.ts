import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ITestimonial} from './testimonial.model';
import {Observable} from 'rxjs';

@Injectable()
export class TestimonialService {
  constructor(private http: HttpClient) {
  }

  fetchTestimonials(): Observable<ITestimonial[]> {
    return this.http.get<ITestimonial[]>('/api/testimonials');
  }
}
