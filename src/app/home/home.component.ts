import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Variables to toggle visibility of login/signup form.
  btn_actn: string;
  show_signup_form: boolean
  show_login_form: boolean
  show_signup_btn: boolean
  show_login_btn: boolean

  constructor() {
    this.reset();
  }

  ngOnInit() {
  }

  // Hide login and signup forms.
  reset() {
    this.show_signup_form = false;
    this.show_login_form = false;
    this.show_signup_btn = true;
    this.show_login_btn = true;
  }

  // Display signup form.
  joinForm() {
    this.reset();
    this.btn_actn = 'JOIN';
    this.show_signup_btn = false;
    this.show_signup_form = true;

  }

  // Display login form.
  loginForm() {
    this.reset();
    this.btn_actn = 'LOGIN';
    this.show_login_btn = false;
    this.show_login_form = true;
  }

}
