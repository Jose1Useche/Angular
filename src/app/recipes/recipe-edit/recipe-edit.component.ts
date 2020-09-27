import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.intiForm();
        }
        );
      }
      
      onSubmit() {
        console.log(this.recipeForm);
      }
      
      
      private intiForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      
      if(recipe['ingredients']) {
        for(let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'ingredientName': new FormControl(ingredient.name, Validators.required),
              'ingredientAmount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
            );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'nameOfTheRecipe': new FormControl(recipeName, Validators.required),
      'imagePathOfTheRecipe': new FormControl(recipeImagePath, Validators.required),
      'descriptionOfTheRecipe': new FormControl(recipeDescription, Validators.required),
      'ingredientsOfTheRecipe': recipeIngredients
    });
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredientsOfTheRecipe')).controls;
  }
  
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredientsOfTheRecipe')).push(
      new FormGroup({
        'ingredientName': new FormControl(null, Validators.required),
        'ingredientAmount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }
  
}
