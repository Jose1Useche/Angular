import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

export interface AppState {
  shoppingList: State;
}

const initialState: State = {
    ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
    editedIngredient: null,
    editedIngredientIndex: -1,
};

export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
      case ShoppingListActions.ADD_INGREDIENT:
        // state.ingredients.push() //Hacer esto es una mala práctica ya que el state debe ser inmutable. Se retorna un nuevo objeto...
        return {
          ...state,
          ingredients: [...state.ingredients, action.myPayload]
        };

      case ShoppingListActions.ADD_INGREDIENTS:
        return {
          ...state,
          ingredients: [...state.ingredients, ...action.myPayload]
        };

      case ShoppingListActions.UPDATE_INGREDIENT:
        const ingredient = state.ingredients[action.myPayload.index];
        const updatedIngredient = {
          ...ingredient,
          ...action.myPayload.ingredient
        };
        const updatedIngredients = [...state.ingredients];
        updatedIngredients[action.myPayload.index] = updatedIngredient;
        return {
          ...state,
          ingredients: updatedIngredients
        };

      case ShoppingListActions.DELETE_INGREDIENT:
        return {
          ...state,
          ingredients: state.ingredients.filter((ig, igIndex) => {
            return igIndex !== action.myPayload;
          })
        };

      default:
        return state;
    }
}