import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model.ts';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export class AddIngredient implement Action {
    readonly type = ADD_INGREDIENT;
    myPayload: Ingredient;
}