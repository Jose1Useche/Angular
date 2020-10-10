import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //Para usar esta librería debemos injectar en el appModule a HttpClientModule
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable(/*{providedIn: 'root'}*/)// {providedIn: 'root'} Permite usar este servicio sin tener que agregarlo de forma manual en el
                                     // appModule. En lo personal me gusta agregarlo
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://recipe-project-angular-fe060.firebaseio.com/chorizo.json', recipes)
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipes() {
        this.http.get<Recipe[]>('https://recipe-project-angular-fe060.firebaseio.com/chorizo.json')
            .subscribe(recipes => {
                this.recipeService.setRecipes(recipes);
            });
    }
}