import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { base_url } from '../../url';

@Injectable()
export class itemEditService {
  headers = new Headers();
  constructor(private http: Http) {}

  edit(bucketlist_id, item_id, body){
    this.headers.set('token', sessionStorage.getItem('token'));
    return this.http.put(`${base_url}/api/V1/bucketlists/${bucketlist_id}/items/${item_id}`, body, {headers: this.headers })
  }

}
