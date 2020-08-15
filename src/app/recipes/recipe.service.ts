import { Recipe } from './/recipe.model'

export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 'This is simply a test', 'https://cdn.pixabay.com/photo/2020/02/01/05/53/thai-food-4809563_960_720.jpg'),
        new Recipe('A Second Recipe', 'This is another test', 'https://c1.peakpx.com/wallpaper/225/871/811/noodles-pad-thai-thai-food-asian-wallpaper-preview.jpg'),
      ];

    getRecipes() {
      return this.recipes.slice(); //this command return a new array wich is an exact copy of the one in this services file. 
    }
}