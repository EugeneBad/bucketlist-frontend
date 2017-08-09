import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  btn_actn:string;
  join_form:boolean = true;
  login_form:boolean = true;
  

  constructor() {
  }

  ngOnInit() {
  }
  joinForm(){
    this.btn_actn = 'JOIN';
    this.join_form = false;
  }

  loginForm(){
    this.btn_actn = 'LOGIN';
    this.login_form = false;
  }

}
