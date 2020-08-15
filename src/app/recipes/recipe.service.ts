import { Recipe } from './/recipe.model'
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();    

    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 
          'This is simply a test', 
          'https://cdn.pixabay.com/photo/2020/02/01/05/53/thai-food-4809563_960_720.jpg',
          [
            new Ingredient('Chicken', 4),
            new Ingredient('wheat flour',1)
          ]),
        new Recipe('A Second Recipe', 
          'This is another test', 
          'https://c1.peakpx.com/wallpaper/225/871/811/noodles-pad-thai-thai-food-asian-wallpaper-preview.jpg',
          [
            new Ingredient('Shrimps', 2),
            new Ingredient('Rice', 1)
          ]),
      ];

    getRecipes() {
      return this.recipes.slice(); //this command return a new array wich is an exact copy of the one in this services file. 
    }
}