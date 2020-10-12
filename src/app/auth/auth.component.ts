import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  activeError: string = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
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

    this.isLoading = true;
    if(this.isLoginMode) {
      // ...Some code
    } else {
      this.authService.signup(email, password)
        .subscribe(resData => {
          console.log(resData);
          this.isLoading = false;
        }, error => {
          console.log(error);
          this.activeError = 'An error occurred!';
          this.isLoading = false;
        });
    }

    form.reset();
  }

}
