import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class bucketlistEditService {
  headers = new Headers();
  constructor(private http: Http) {}

  edit(bucketlistId, body){
    this.headers.set('token', sessionStorage.getItem('token'));
    return this.http.put(`http://localhost:5000/api/V1/bucketlists/${bucketlistId}`, body, { headers: this.headers });
  }

}
