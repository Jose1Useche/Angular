import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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
      'usernameDesdeMiTS': new FormControl(null),
      'emailDesdeMiTS': new FormControl(null),
      'genderDesdeMiTS': new FormControl('male')
    });
  }
}
