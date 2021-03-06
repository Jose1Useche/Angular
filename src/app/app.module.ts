import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';
import { authReducer } from './auth/store/auth.reducer';
import * as fromApp from './store/app.reducer';
import { AuthEffects } from './auth/store/auth.effect';

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
    // StoreModule.forRoot({
    //   shoppingList: shoppingListReducer, 
    //   auth: authReducer
    // }),
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects]),
    //It's now in lazy loading // RecipesModule,
    //It's now in lazy loading // ShoppingListModule,
    //It's now in lazy loading // AuthModule,
    SharedModule,
    CoreModule // aquí metemos toda la seccion de los providers: []
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
