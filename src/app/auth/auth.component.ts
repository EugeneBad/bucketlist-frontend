import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { CanActivate, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  @Input () btn_actn;

  username:string;
  password:string;
  missing_details:boolean;
  duplicate_username:boolean;
  wrong_details:boolean;


  constructor(private http:Http, private router:Router) {
    this.reset();
  }

  ngOnInit() {
  }

  reset(){
    this.password = "";
    this.missing_details = false;
    this.duplicate_username = false;
    this.wrong_details = false;
  }

  btnAction(){
    if (this.btn_actn == 'JOIN'){
      this.join();
    }

    if (this.btn_actn == 'LOGIN'){
      this.login();
    }
  }

  join(){
    let response_code; //Redudant
    let body = new FormData();
    body.append('username', this.username);
    body.append('password', this.password);
    this.http.post('http://localhost:5000/api/V1/auth/register', body)
      .subscribe(data => this.authenticate(data), err => this.authenticate(err));


  }
  login(){
    let response_code; //Redundant
    let body = new FormData();
    body.append('username', this.username);
    body.append('password', this.password);
    this.http.post('http://localhost:5000/api/V1/auth/login', body)
      .subscribe(data => this.authenticate(data), err => this.authenticate(err));

  }

  authenticate(response){
    let response_code = response.status;

    if (response_code == 409){
      this.reset();
      this.duplicate_username = true;
    }
    if (response_code == 400 || response_code == 401){
      this.reset();
      this.missing_details = true;

    }
    if (response_code == 401){
      this.reset();
      this.wrong_details = true;
    }

    if (response_code == 200 || response_code == 201){
      let token = JSON.parse(response._body).auth_token;

      this.router.navigate(['/dashboard'], {queryParams: {token: token}});
    }

  }
}
