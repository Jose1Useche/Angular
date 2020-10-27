import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ShoppingListComponent } from "./shopping-list.component";
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
    { path: '', component: ShoppingListComponent },
];


@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule
    ],
    exports: [RouterModule]
})
export class ShoppingListRoutingModule { }