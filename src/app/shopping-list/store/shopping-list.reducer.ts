import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

// export interface AppState { // El lugar mas adecuado para colocar esta interfaz es el app.reducer.ts para tratarse de forma global.
//   shoppingList: State;
// }

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
        // const ingredient = state.ingredients[action.myPayload.index];
        const ingredient = state.ingredients[state.editedIngredientIndex];
        const updatedIngredient = {
          ...ingredient,
          // ...action.myPayload.ingredient
          ...action.myPayload
        };
        const updatedIngredients = [...state.ingredients];
        // updatedIngredients[action.myPayload.index] = updatedIngredient;
        updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
        return {
          ...state,
          ingredients: updatedIngredients,
          editedIngredientIndex: -1,
          editedIngredient: null
        };

      case ShoppingListActions.DELETE_INGREDIENT:
        return {
          ...state,
          ingredients: state.ingredients.filter((ig, igIndex) => {
            // return igIndex !== action.myPayload;
            return igIndex !== state.editedIngredientIndex;
          }),
          editedIngredientIndex: -1,
          editedIngredient: null
        };

      case ShoppingListActions.START_EDIT:
        return {
          ...state,
          editedIngredientIndex: action.myPayload,
          editedIngredient: {...state.ingredients[action.myPayload]} //genero una nueva copia, un reference distinto a mi state ya que
                                                                     //debe ser inmutable.
        };

      case ShoppingListActions.STOP_EDIT:
        return {
          ...state,
          editedIngredient: null,
          editedIngredientIndex: -1
        };

      default:
        return state;
    }
}