import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.AddIngredient) {
    switch (action.type) {
      case ShoppingListActions.ADD_INGREDIENT:
        // state.ingredients.push() //Hacer esto es una mala práctica ya que el state debe ser inmutable. Se retorna un nuevo objeto...
        return {
          ...state,
          ingredients: [...state.ingredients, action.myPayload]
        };
    }
}