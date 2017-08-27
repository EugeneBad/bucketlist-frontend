import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { itemEditService } from './services/edit.service';
import { itemDeleteService } from './services/delete.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  headers = new Headers();
  edited_name:string = "";
  duplicate_name:boolean;
  successful_name:boolean;

  @Input() itemsArray;
  @Input() bucketlist_id;
  @Output() onUpdate = new EventEmitter();

  constructor(private editService: itemEditService, private deleteService: itemDeleteService) { }

  ngOnInit() {
    this.headers.append('token', sessionStorage.getItem('token'));
  }

editItem(event){
  let item_id = event.target.id.split('_')[2];
  let body = new FormData();
  if (this.edited_name != ""){
    body.set('name', this.edited_name);
  }
  let completionStatus = (<HTMLInputElement>document.getElementById(`done_checkbox_${item_id}`)).checked;
  body.set('done', String(completionStatus));

  this.editService.edit(this.bucketlist_id, item_id, body)
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
                            self.onUpdate.emit()}, 1000);
  }
}

deleteItem(event){
  let item_id = event.target.id.split('_')[2];
  this.deleteService.delete(this.bucketlist_id, item_id)
  .subscribe(data => this.onUpdate.emit());
}


}
