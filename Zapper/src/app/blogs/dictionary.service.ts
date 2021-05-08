import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICategory} from './dictionary.model';

@Injectable()
export class DictionaryService {
  constructor(private http: HttpClient) {
  }

  fetchCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>('/api/dictionary/categories');
  }
}
