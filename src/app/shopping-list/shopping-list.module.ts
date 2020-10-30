import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
// import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [
        RouterModule, // con esto corrijo los errores de enrutamiento
        // Ahora el CommonModule me lo traigo de ShoppingListRoutingModule// CommonModule, // con esto habilito los ngIf ngFor
        FormsModule, //habilito la creacion de formularios.
        ShoppingListRoutingModule
    ]
})
export class ShoppingListModule { }