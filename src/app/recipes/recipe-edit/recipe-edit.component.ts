import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
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

  constructor(private route: ActivatedRoute, 
              private recipeService: RecipeService,
              private router: Router) { }

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
    // console.log(this.recipeForm);
    const newRecipe = new Recipe(
      this.recipeForm.value['nameOfTheRecipe'],
      this.recipeForm.value['descriptionOfTheRecipe'],
      this.recipeForm.value['imagePathOfTheRecipe'],
      this.recipeForm.value['ingredientsOfTheRecipe'],
    );

    if(this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
      // this.recipeService.updateRecipe(this.id, this.recipeForm.value); //Pudiesemos hacerlo así siempre y cuando los nombres de los
                                                                          //valores del recipeForm coincidan con los nombres de las
                                                                          //propiedades del recipe.model.ts y el orden en como están
                                                                          //delcaradas las propiedades tambien deben coincidir con el
                                                                          //orden en que están declarados los valores del recipeForm
    } else {
      this.recipeService.addRecipe(newRecipe);
    }

    this.onCancel();
  }
  
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
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
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
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
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredientsOfTheRecipe')).removeAt(index);
  }
  
}
