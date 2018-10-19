import { BadRequest } from './../errors/bad-request';
import { PostsService } from './posts.service';
import { Component, OnInit } from '@angular/core';
import { AppError } from '../errors/app-error';
import { NotFoundError } from '../errors/not-found-error';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: any[];

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getPosts()
    .subscribe(res => {
      console.log(res);
      this.posts = res;
    });
  }

  crearPost(input: HTMLInputElement) {
    let post = { title: input.value };
    this.posts.splice(0,0,post);
    input.value = '';
    this.postsService.servicioPost(input.value)
    .subscribe(
      res => {
      //post['id']= res;      
      console.log(res);
    }, 
    (error: AppError) => {
      this.posts.splice(0,1);
      if(error instanceof BadRequest) {
         //this.form.setErrors(error.originalError); en caso de tener un reactive form y mostrar un mensaje al lado de un input
      } else {
        throw error;
      }  
    });
  }

  updatePost(post) {
    this.postsService.update(post)
    .subscribe(res => {
      console.log(res);      
    });
  }

  deletePost(post) {
    let index = this.posts.indexOf(post);
    this.posts.splice(index, 1); 
    this.postsService.delete(post.id)
    .subscribe(
      null, 
    (error: AppError) => {
      this.posts.splice(index, 0, post);
      if(error instanceof NotFoundError) {
        alert('Este post ya ha sido borrado');
      } else {
        throw error;
      }  
    });
  }

}
