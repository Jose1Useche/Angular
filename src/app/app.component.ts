import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
@ViewChild('f') signupForm: NgForm;
defaultQuestion = 'pet';//or teacher
answer = '';
genders = ['male', 'female'];
user = {
  myUsername: '',
  myEmail: '',
  mySecretQuestion: '',
  myAnswer: '',
  myGender: ''
};
submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.signupForm.setValue({   //THIS IS ONE APPROACH ==> setValue() to set your whole form.
    //   El_Grupito: {
    //     username: suggestedName,
    //     email: 'test1@gmail.com'
    //   },
    //   secret: 'teacher',
    //   questionAnswer: 'fredy',
    //   genero: 'male'
    // });

    this.signupForm.form.patchValue({ // patchValue() to overwrite part of the form.
      El_Grupito: {
        username: suggestedName
      }
    });
  }

  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  onSubmit() {
    this.submitted = true;

    this.user.myUsername = this.signupForm.value.El_Grupito.username;
    this.user.myEmail = this.signupForm.value.El_Grupito.email;
    this.user.mySecretQuestion = this.signupForm.value.secret;
    this.user.myAnswer = this.signupForm.value.questionAnswer;
    this.user.myGender = this.signupForm.value.genero;

    this.signupForm.reset();
  }
}
