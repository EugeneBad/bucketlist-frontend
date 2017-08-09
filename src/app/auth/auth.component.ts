import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  username = "";
  password = "";
  missing_details:boolean = false;
  duplicate_username:boolean = false;
  wrong_details:boolean = true;

  @Input () btn_actn;

  constructor(private http:Http) { }

  ngOnInit() {
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
    let response_code;
    this.http.post('http://localhost:5000/api/V1/auth/register', {})
      .subscribe(data => this.authenticate(data), err => this.authenticate(err));


  }
  login(){

  }

  authenticate(response){
    let response_code = JSON.parse(JSON.stringify(response)).status;

  }
}
