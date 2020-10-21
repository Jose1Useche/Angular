import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; //Para usar esta librería debemos injectar en el appModule a HttpClientModule
import { exhaustMap, map, take, tap } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable(/*{providedIn: 'root'}*/)// {providedIn: 'root'} Permite usar este servicio sin tener que agregarlo de forma manual en el
                                     // appModule. En lo personal me gusta agregarlo
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://recipe-project-angular-fe060.firebaseio.com/chorizo.json', recipes)
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipes() {
        return this.authService.user.pipe(take(1), exhaustMap(user => {//take() is called as a function and I simple pass a number to it. 
                                                            //The number 1 tells to this function that it only want to take one value from 
                                                            //that observable and there after it automatically unsubscribe.

                                                                //exhaustMap() waits for the first observable, there after We get the
                                                                //data from the first observable and return a new observable that will
                                                                //be replace the first one. In this case is the http observable.

            return this.http.get<Recipe[]>(
                // 'https://recipe-project-angular-fe060.firebaseio.com/chorizo.json?auth=' + user.token
                'https://recipe-project-angular-fe060.firebaseio.com/chorizo.json',
                {
                    params: new HttpParams().set('auth', user.token)
                }
                )
        }),map(recipes => { //este map es de rxjs/operators el cual nos permite transformar esta data
            return recipes.map(recipe => { //este map es distinto ya que es un metodo normal de los arrays propio de JS.
                return {
                    ...recipe, 
                    ingredients: recipe.ingredients ? recipe.ingredients : []
                };
            })
        }),
        //El operador tap nos permite ejecutar cierto código justo acá sin alterar la data final que viene a través del observable
        tap(recipes => {
            this.recipeService.setRecipes(recipes);
        }));
    }
}