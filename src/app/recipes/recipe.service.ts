import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { Recipe } from './/recipe.model'
import { Ingredient } from '../shared/ingredient.model';
// import { ShoppingListService } from '../shopping-list/shopping-list.service';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions'
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  recipes: Recipe[] = [];

    // private recipes: Recipe[] = [
    //     new Recipe('A Test Recipe', 
    //       'This is simply a test', 
    //       'https://cdn.pixabay.com/photo/2020/02/01/05/53/thai-food-4809563_960_720.jpg',
    //       [
    //         new Ingredient('Chicken', 4),
    //         new Ingredient('wheat flour',1)
    //       ]),
    //     new Recipe('A Second Recipe', 
    //       'This is another test', 
    //       'https://c1.peakpx.com/wallpaper/225/871/811/noodles-pad-thai-thai-food-asian-wallpaper-preview.jpg',
    //       [
    //         new Ingredient('Shrimps', 2),
    //         new Ingredient('Rice', 1)
    //       ]),
    //   ];

    constructor(
      // private slServer: ShoppingListService, 
      private store: Store<fromShoppingList.AppState>
      // private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
      ) {}

    setRecipes(recipes: Recipe[]) {
      this.recipes = recipes;
      this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
      return this.recipes.slice(); 
    }

    getRecipe(index: number) {
      return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
      // this.slServer.addIngredients(ingredients);
      this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
      this.recipes.splice(index,1);
      this.recipesChanged.next(this.recipes.slice());
    }
}