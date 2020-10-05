import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Post } from './post.model'
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable(/*{providedIn: 'root'}*/) //Podemos usar este approuch o podemos ir a nuestro app.module.ts y declarar este servicio dentro
                                      //de nuestro providers array, el cual me gusta mas.
export class PostsService {
    error = new Subject<string>();
    
    constructor(private http: HttpClient) {}

    createAndStorePost(title: string, content: string) {
        const postData: Post = {title: title, content: content};
        // Send Http request
        // console.log(postData);
        this.http.post<{ name: string }>(
            'https://angular-project-excercise.firebaseio.com/posts.json', //Este .json que declaramos solo es necesario para Firebase.
            postData,
            {
                observe: 'response'//Esto solo es para obtener de forma mas detallada el HttpRequest realizado. Es algo que no se usa 
                                   //de forma común pero helo aquí
            }
            ).subscribe(responseData => {//Ese observable es provisto por Angular por lo que no necesitamos "desusbscribirlo".
                                        //Angular lo hace por nosotros.
                console.log(responseData);
            }, error => {
                this.error.next(error.message);
            }); 
    }

    fetchPost() { //quito la subscripción de este metodo ya que el requerimiento no se envía al servidor "si nadie lo toma en cuenta",
                  //es decir, sin una subscripción involucrada Angular entiende que si no nos importa lo que retorne esto pues no nos
                  //interesa si llegó o no, por lo que Angular sencillamente no envía un requerimiento que no nos importa.
                  //Se hace el return para usar la subscripción en el componente.
        let searchParams =  new HttpParams();
        searchParams = searchParams.append('print','pretty');
        searchParams = searchParams.append('culito','peluo');
        return this.http
          //podemos indicar tambien el tipo que retorna en el .post (líneas arriba)
        .get<{ [key: string]: Post }>('https://angular-project-excercise.firebaseio.com/posts.json',
        {
            headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
            // params: new HttpParams().set('print', 'pretty')
            params: searchParams // fijate en el Network del browser en General, el Request del URL
        })
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
        }),
            catchError(errorRes => { //Visualmente no ves nada el en DOM, solo que el catch lo tienes disponibkle tambien por si necesitas
                                     //mandar el error a algun otro lado.
                //Send to analytics server
                return throwError(errorRes);
            })
        );
        // .subscribe(posts => {
        // // console.log(posts)
        // // this.isFetching = false;
        // // this.loadedPosts = posts;
        // });
    }

    deletePosts() {
        return this.http.delete('https://angular-project-excercise.firebaseio.com/posts.json',
        {
            observe: 'events' //Esto solo es para obtener de forma mas detallada el HttpRequest realizado. Es algo que no se usa 
                              //de forma común pero helo aquí
        }).pipe(tap(event => {
            console.log(event);
            if(event.type === HttpEventType.Sent) {
                //...
            }
            if(event.type === HttpEventType.Response) {
                console.log(event.body);
            }
        })); 
    }
}