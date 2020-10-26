import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    //Las declaraciones se hacen solo una vez, no importa si estas en módulos distintos; estos 3 ya estan declarados en SharedModule
    // DropdownDirective,
    // LoadingSpinnerComponent,
    // AlertComponent,
  ],
  imports: [
    BrowserModule,
    //Se movió a auth.module.ts // FormsModule,//We need this to sincronize our form with the html form.
    //Se movió a auth.module.ts // ReactiveFormsModule,//We need this to sincronize our form with the html form.
    HttpClientModule, //This is crucial to unlock the http client functionality in our application.
    AppRoutingModule,
    RecipesModule,
    ShoppingListModule,
    AuthModule,
    SharedModule,
    CoreModule // aquí metemos toda la seccion de los providers: []
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
