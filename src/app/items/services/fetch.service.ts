import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { base_url } from '../../url';

@Injectable()
export class itemFetchService {
  headers = new Headers();
  constructor(private http: Http) {}

  fetch(itemsBucketlist){
    this.headers.set('token', sessionStorage.getItem('token'));
    return this.http.get(`${base_url}/api/V1/bucketlists/${itemsBucketlist}/items`, { headers: this.headers })
  }

}
