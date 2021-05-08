import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IBlog} from './blogs.model';

@Injectable()
export class BlogsService {
  constructor(private http: HttpClient) {
  }

  fetchBlogs(): Observable<IBlog[]> {
    return this.http.get<IBlog[]>('/api/blogs');
  }

  fetchBlog(id: number): Observable<IBlog> {
    return this.http.get<IBlog>(`/api/blogs/${id}`);
  }
}
