import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { base_url } from '../../url';

@Injectable()
export class bucketlistFetchService {
  headers = new Headers();
  constructor(private http: Http) {}

  fetch(offset, q){
    this.headers.set('token', sessionStorage.getItem('token'));
    return this.http.get(`${base_url}/api/V1/bucketlists?limit=4&offset=${offset}&q=${q}`, { headers: this.headers });
  }

}
