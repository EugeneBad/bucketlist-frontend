import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { base_url } from '../../url';

@Injectable()
export class bucketlistDeleteService {
  headers = new Headers();
  constructor(private http: Http) {}

  delete(bucketlistId){
    this.headers.set('token', sessionStorage.getItem('token'));
    return this.http.delete(`${base_url}/api/V1/bucketlists/${bucketlistId}`,{headers: this.headers});
  }

}
