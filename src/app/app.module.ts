import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeService } from './recipes/recipe.service';
import { DataStorageService } from './shared/data-storage.service';
import { RecipesResolverService } from './recipes/recipe-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthService} from './auth/auth.service'
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AuthGuard } from './auth/auth.guard';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    //Las declaraciones se hacen solo una vez, no importa si estas en módulos distintos; estos 3 ya estan declarados en SharedModule
    // DropdownDirective,
    // LoadingSpinnerComponent,
    // AlertComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,//We need this to sincronize our form with the html form.
    HttpClientModule, //This is crucial to unlock the http client functionality in our application.
    AppRoutingModule,
    RecipesModule,
    ShoppingListModule,
    SharedModule
  ],
  providers: [
      ShoppingListService, 
      RecipeService, 
      DataStorageService, 
      RecipesResolverService,
      AuthService, 
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
      AuthGuard
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
