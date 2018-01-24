import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { base_url } from '../../url';

@Injectable()
export class bucketlistAddService {
  headers = new Headers();
  constructor(private http: Http) {}

  add(body){
    this.headers.set('token', sessionStorage.getItem('token'));
    return this.http.post(`${base_url}/api/V1/bucketlists`, body, { headers: this.headers });
  }

}
