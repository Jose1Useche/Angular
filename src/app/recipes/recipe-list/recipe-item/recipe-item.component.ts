import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  // @Input() recipeName: string;
  // @Input() recipeDescription: string;
  // @Input() recipeImage: string;  MY WAY...
    @Input() recipe: Recipe;

  constructor() { }
  
  ngOnInit(): void {
    
  }
}
