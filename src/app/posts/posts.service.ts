import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    return this.http.post(this.url, post);
  }

  update(post) {
    return this.http.patch(this.url + '/' + post.id, {isRead: true});
  }

  delete(post) {
    return this.http.delete(this.url + '/' + post.id);
  }
}
