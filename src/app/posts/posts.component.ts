import { NotFoundError } from './../not-found-error';
import { AppError } from './../app-error';
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
    this.postsService.getPosts()
    .subscribe(res => {
      console.log(res);
      this.posts = res;
    }, 
    error => {
      alert('Ocurrió un error inesperado.');
      console.log(error);      
    });
  }

  crearPost(input: HTMLInputElement) {
    let post = { title: input.value };
    input.value = '';
    this.postsService.servicioPost(input.value)
    .subscribe(
      res => {
      //post['id']= res;
      this.posts.splice(0,0,post);
      console.log(res);
    }, 
    (error: Response) => {
      if(error.status === 400) {
        // this.form.setErrors(error.json()); en caso de tener un reactive form y mostrar un mensaje al lado de un input
      } else {
        alert('Ocurrió un error inesperado.');
        console.log(error); 
      }     
    });
  }

  updatePost(post) {
    this.postsService.update(post)
    .subscribe(res => {
      console.log(res);      
    }, 
    error => {
      alert('Ocurrió un error inesperado.');
      console.log(error);      
    });
  }

  deletePost(post) {
    this.postsService.delete(post)
    .subscribe(res => {
      console.log(res);
      let index = this.posts.indexOf(post);
      this.posts.splice(index, 1);      
    }, 
    (error: AppError) => {
      if(error instanceof NotFoundError) {
        alert('Este post ya ha sido borrado');
      } else {
        alert('Ocurrió un error inesperado.');
      console.log(error); 
      }           
    });
  }

}
