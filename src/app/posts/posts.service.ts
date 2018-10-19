import { BadRequest } from './../errors/bad-request';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppError } from '../errors/app-error';
import { NotFoundError } from '../errors/not-found-error';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  private url = 'https://sdfjsonplaceholder.typicode.com/posts';

  getPosts() {
    return this.http.get<any[]>(this.url);
  }

  servicioPost(post) {
    return this.http.post(this.url, post).pipe(catchError((error: Response) => {
      if(error.status === 400)
        return throwError(new BadRequest(error));
      return throwError(new AppError(error));
    }));
  }

  update(post) {
    return this.http.patch(this.url + '/' + post.id, {isRead: true});
  }

  delete(post) {
    return this.http.delete(this.url + '/' + post.id).pipe(catchError((error: Response) => {
      if(error.status === 404)
        return throwError(new NotFoundError());
      return throwError(new AppError(error));
    }));
  }
}
