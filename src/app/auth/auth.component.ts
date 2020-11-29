import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthResponseData, AuthService } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  activeError: string = null;
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;

  private closeSub: Subscription;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
    ) { }
  

  ngOnInit() {
    this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.activeError = authState.authError;
      if(this.activeError) {
        this.showErrorAlert(this.activeError);
      }
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    console.log(this.isLoginMode);
  }

  onSubmit(form: NgForm) {
    // console.log(form);
    // console.log(form.value);
    if(!form.valid) { //Sabemos que esta validación no sería necesaria ya que el submit button no se activa a menos que el form sea
                      //válido, sin embargo, alguien pudiese quitar el disable del DOM a traves del Browser Developer Tools. Así que
                      //ésta validación lo haría trabajar un poquito mas, sabemos que esto tambien está visible en el DOM, pero bueh...

      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if(this.isLoginMode) {
      // ...Some code
      
      // authObs = this.authService.login(email, password); //SUSTITUÍMOS EL SERVICIO POR EL PATRON REDUX
      this.store.dispatch(
        new AuthActions.LoginStart({email: email, password: password})
      );
    } else {
      authObs = this.authService.signup(email,password);
      // this.authService.signup(email, password)
      //   .subscribe(resData => {
      //     console.log(resData);
      //     this.isLoading = false;
      //   }, errorMessage => {
      //     console.log(errorMessage);
      //     this.activeError = errorMessage;
      //     // switch (errorRes.error.error.message) {
      //     //   case 'EMAIL_EXISTS':
      //     //     this.activeError = 'This Email exists already!';
      //     // }
      //     this.isLoading = false;
      //   });
    }
    // authObs.subscribe(resData => {
    //   console.log(resData);
    //   this.isLoading = false;
    //   this.router.navigate(['/recipes']);
    // }, errorMessage => {
    //   console.log(errorMessage);
    //   this.activeError = errorMessage;
    //   this.isLoading = false;
    // });

    form.reset();
  }

  onHandleError() {
    this.activeError = null;
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  private showErrorAlert(message: string) {
    // const alertCmp = new AlertComponent();
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

}
