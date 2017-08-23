import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  headers = new Headers();
  edited_name:string;
  duplicate_name:boolean;
  successful_name:boolean;

  @Input() itemsArray;
  @Input() bucketlist_id;
  @Output() onUpdate = new EventEmitter();

  constructor(private http: Http) { }

  ngOnInit() {
    this.headers.append('token', sessionStorage.getItem('token'));
  }

editItem(event){
  let body = new FormData();
  body.set('name', this.edited_name);
  let item_id = event.target.id.split('_')[2];
  this.http.put(`http://localhost:5000/api/V1/bucketlists/${this.bucketlist_id}/items/${item_id}`, body, {headers: this.headers })
  .subscribe(data => this.validate(data), err => this.validate(err));

}
validate(response){
  let response_code = response.status;

  if (response_code == 409) {
    this.duplicate_name = true;
    let self = this;
    setTimeout(function() { self.duplicate_name = false; }, 2000);
    }

  if (response_code == 200){
    this.successful_name = true;
    let self = this;
    setTimeout(function() { self.successful_name = false;
                            self.edited_name = '';
                            self.onUpdate.emit()}, 2000);
  }
}

deleteItem(event){
  let item_id = event.target.id.split('_')[2];
  this.http.delete(`http://localhost:5000/api/V1/bucketlists/${this.bucketlist_id}/items/${item_id}`, {headers: this.headers })
  .subscribe(data => this.onUpdate.emit());
}


}
