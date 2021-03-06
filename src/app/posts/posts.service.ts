import { BadRequest } from './../errors/bad-request';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppError } from '../errors/app-error';
import { NotFoundError } from '../errors/not-found-error';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  private url = 'https://jsonplaceholder.typicode.com/posts';

  getPosts() {
    return this.http.get<any[]>(this.url);
  }

  servicioPost(post) {
    //return throwError(new AppError()); para simular rollback
    return this.http.post(this.url, post).pipe(catchError(this.handleErrors));
  }

  update(post) {
    return this.http.patch(this.url + '/' + post.id, {isRead: true}).pipe(catchError(this.handleErrors));
  }

  delete(post) {
    return this.http.delete(this.url + '/' + post).pipe(catchError(this.handleErrors));
  }

  private handleErrors(error: Response) {
    if(error.status === 404)
      return throwError(new NotFoundError());

    if(error.status === 400)
      return throwError(new BadRequest(error));

    return throwError(new AppError(error));
  }
}
