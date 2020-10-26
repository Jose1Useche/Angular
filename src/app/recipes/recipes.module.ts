import { NgModule } from '@angular/core';

import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [ //Paso 1: Declaramos los componentes que vamos a utilizar acá en declarations. Debemos importarlos para poder usarlos.
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent,
    ],
    imports: [
        RouterModule, // con esto corrijo los errores de enrutamiento
        SharedModule,// CommonModule, // con esto habilito los ngIf ngFor
        ReactiveFormsModule, //habilito la creacion de formularios.
        RecipesRoutingModule 
    ],
    
    //NOTA: no hay exportacion ya que se maneja desde RecipesRoutingModule

    // exports: [ //Paso 2: Una vez que nuestros componentes están incluidos pues se habilita la opción de exportación para que cualquier
    //            //otro módulo que implemente a recipes.module.ts pueda hacer uso de estos componentes.
    //     RecipesComponent,
    //     RecipeListComponent,
    //     RecipeDetailComponent,
    //     RecipeItemComponent,
    //     RecipeStartComponent,
    //     RecipeEditComponent,
    // ]
})
export class RecipesModule { }