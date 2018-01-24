import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { base_url } from '../../url';

@Injectable()
export class itemDeleteService {
  headers = new Headers();
  constructor(private http: Http) {}

  delete(bucketlist_id, item_id){
    this.headers.set('token', sessionStorage.getItem('token'));
    return this.http.delete(`${base_url}/api/V1/bucketlists/${bucketlist_id}/items/${item_id}`, {headers: this.headers })
  }

}
