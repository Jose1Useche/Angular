import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ShoppingListComponent } from "./shopping-list.component";
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
    { path: '', component: ShoppingListComponent },
];


@NgModule({
    imports: [
        SharedModule,//IMPORTANTISIMO EL ORDEN DE LA IMPORTACION, SE DEBE EJECUTAR EN UN ORDEN LÓGICO
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule, SharedModule]
})
export class ShoppingListRoutingModule { }