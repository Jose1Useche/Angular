import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm: FormGroup;

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userDataDesdeMiTS': new FormGroup({
        'usernameDesdeMiTS': new FormControl(null, Validators.required),
        'emailDesdeMiTS': new FormControl(null, [Validators.required, Validators.email])
      }),
      'genderDesdeMiTS': new FormControl('male')
    });
  }

  onSubmit() {
    console.log(this.signupForm);
  }
}
