import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model'
import { map } from 'rxjs/operators';

@Injectable(/*{providedIn: 'root'}*/) //Podemos usar este approuch o podemos ir a nuestro app.module.ts y declarar este servicio dentro
                                      //de nuestro providers array, el cual me gusta mas.
export class PostsService {
    constructor(private http: HttpClient) {}

    createAndStorePost(title: string, content: string) {
        const postData: Post = {title: title, content: content};
        // Send Http request
        // console.log(postData);
        this.http.post<{ name: string }>(
            'https://angular-project-excercise.firebaseio.com/posts.json', //Este .json que declaramos solo es necesario para Firebase.
            postData
            ).subscribe(responseData => {//Ese observable es provisto por Angular por lo que no necesitamos "desusbscribirlo".
                                        //Angular lo hace por nosotros.
            console.log(responseData);
            }); 
    }

    fetchPost() {
        this.http
          //podemos indicar tambien el tipo que retorna en el .post (líneas arriba)
        .get<{ [key: string]: Post }>('https://angular-project-excercise.firebaseio.com/posts.json')
        .pipe(map((responseData/*: { [key: string]: Post }*/) => { //Puedes usar un PlaceHolder property name con [] indicando que 
            //cualquier string key que viene del objeto cuyo nombre pues desconocemos, contiene un Objeto tipo Post.
        const postsArray: Post[] = [];
        for(const key in responseData) {
            if(responseData.hasOwnProperty(key)) {
            postsArray.push({ ...responseData[key], id: key/*, anotherProperty: 'Hola Enfermeraaaa!'*/ }) //No podemos anexar esta tercera
                                                            //propiedad ya que es un Objeto tipo Post la cual tiene sus propiedades bien
                                                            //definidas.
            }
        }
        return postsArray;
        }))
        .subscribe(posts => {
        // console.log(posts)
        // this.isFetching = false;
        // this.loadedPosts = posts;
        });
        }
}