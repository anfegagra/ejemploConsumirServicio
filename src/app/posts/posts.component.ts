import { PostsService } from './posts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: any[];

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getPosts().subscribe(res => {
      console.log(res);
      this.posts = res;
    });
  }

  crearPost(input: HTMLInputElement) {
    let post = { title: input.value };
    input.value = '';
    this.postsService.servicioPost(input.value).subscribe(res => {
      //post['id']= res;
      this.posts.splice(0,0,post);
      console.log(res);
    })
  }

  updatePost(post) {
    this.postsService.update(post).subscribe(res => {
      console.log(res);
      
    })
  }

  deletePost(post) {
    this.postsService.delete(post).subscribe(res => {
      console.log(res);
      let index = this.posts.indexOf(post);
      this.posts.splice(index, 1);
      
    })
  }

}
