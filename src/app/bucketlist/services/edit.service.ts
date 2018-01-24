import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { base_url } from '../../url';

@Injectable()
export class bucketlistEditService {
  headers = new Headers();
  constructor(private http: Http) {}

  edit(bucketlistId, body){
    this.headers.set('token', sessionStorage.getItem('token'));
    return this.http.put(`${base_url}/api/V1/bucketlists/${bucketlistId}`, body, { headers: this.headers });
  }

}
