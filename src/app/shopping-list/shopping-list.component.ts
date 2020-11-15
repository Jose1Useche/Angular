import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // ingredients: Ingredient[];
  ingredients: Observable<{ ingredients: Ingredient[] }>;//Hacemos de esta propiedad un Observable porque lo que retorna
                                                         //this.store.select('shoppingList'); es un Observable
  // private subscription: Subscription;

  constructor(
    private slService: ShoppingListService, 
    private store: Store<fromShoppingList.AppState>
    // private store: Store<{ shoppingList: { ingredients: Ingredient[] } }> //El nombre shoppingList debe ser el mismo que se encuentra en
    //                                                                       //el StoreModule del app.module.ts
    //                                                                       //El nombre de la propiedad ingredients debe ser el mismo que
    //                                                                       //se encuentra en shoppingListReducer (en este caso se refiere
    //                                                                       //a la propiedad ingredients declarada dentro de initialState.
    ) { }
  
  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');

    // this.ingredients = this.slService.getIngredients();
    // this.subscription = this.slService.ingredientsChanged
    //   .subscribe(
    //     (ingredients: Ingredient[]) => {
    //       this.ingredients = ingredients;
    //     }
    //   )
  }

  onEditItem(index: number) {
    // this.slService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }
}
