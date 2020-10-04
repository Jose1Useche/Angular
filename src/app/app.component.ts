import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    this.fetchPostCleaner();
  }

  onCreatePost(postData: Post) {
    this.postsService.createAndStorePost(postData.title, postData.content);

    //toda la lógica se envió al servicio posts.service para tener un código lo mas limpio posible. por lo general, el trabajo "sucio"
    //lo hace el servicio en cuestión.
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPostCleaner();
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  // private fetchPosts() {
  //   this.isFetching = true;
  //   //toda la lógica se envió al servicio posts.service para tener un código lo mas limpio posible. por lo general, el trabajo "sucio"
  //   //lo hace el servicio en cuestión.
    
  // }

  private fetchPostCleaner() {
    this.isFetching =  true;
    this.postsService.fetchPost().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    });
  }
}
