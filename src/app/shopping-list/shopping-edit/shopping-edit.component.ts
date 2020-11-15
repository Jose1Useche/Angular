import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/ingredient.model';
// import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppongList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  // editedItemIndex: number;
  editedItem: Ingredient;

  constructor(
    // private slService: ShoppingListService, 
    private store: Store<fromShoppongList.AppState>
    // private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
    ) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if(stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.slForm.setValue({
          nameFromTheForm: this.editedItem.name,
          amountFromTheForm: this.editedItem.amount
        });
      } else {
        this.editMode = false;
      }
    });
    // this.subscription = this.slService.startedEditing
    //   .subscribe(
    //     (index: number) => {
    //       this.editedItemIndex = index;
    //       this.editMode = true;
    //       this.editedItem = this.slService.getIngredient(index);
    //       this.slForm.setValue({
    //         nameFromTheForm: this.editedItem.name,
    //         amountFromTheForm: this.editedItem.amount
    //       });
    //     }
    //   );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.nameFromTheForm, value.amountFromTheForm);
    if(this.editMode) {
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      // this.store.dispatch(new ShoppingListActions.UpdateIngredient({index: this.editedItemIndex, ingredient: newIngredient}))
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient));
    } else {
      // this.slService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete() {
    // this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(/*this.editedItemIndex)*/));
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
