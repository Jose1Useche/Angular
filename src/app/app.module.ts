import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PostsService } from './posts.service';
import { AuthInterceptorService } from './auth-interceptor.service'
import { LogginInterceptorService } from './logging-interceptor.service'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule], //HttpClientModule habilitado para poder mandar
                                                           //requests al server.
  providers: [PostsService, 
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptorService,
      multi: true
    },
    { //el orden es importante porque se ejecutan de arriba hacia abajo
      provide: HTTP_INTERCEPTORS, 
      useClass: LogginInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
