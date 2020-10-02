import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    // console.log(postData);
    this.http.post(
        'https://angular-project-excercise.firebaseio.com/posts.json', //Este .json que declaramos solo es necesario para Firebase.
        postData
        ).subscribe(responseData => {//Ese observable es provisto por Angular por lo que no necesitamos "desusbscribirlo".
                                     //Angular lo hace por nosotros.
          console.log(responseData);
        }); 
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.http
    .get('https://angular-project-excercise.firebaseio.com/posts.json')
    .pipe(map(responseData => {
      const postsArray = [];
      for(const key in responseData) {
        if(responseData.hasOwnProperty(key)) {
          postsArray.push({ ...responseData[key], id: key, anotherProperty: 'Hola Enfermeraaaa!' })
        }
      }
      return postsArray;
    }))
    .subscribe(posts => {
      console.log(posts)
    });
  }
}
