import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-model-node',
  templateUrl: './model-node.component.html',
  styleUrls: ['./model-node.component.scss']
})
export class ModelNodeComponent implements OnInit {
  fields: Array<string>;
  fieldTypes: Array<string>;

  constructor() { 
    this.fields = ["Title", "Author", "StartDate", "EndDate"];
    this.fieldTypes = ["text", "number", "date"];
  }

  ngOnInit() {
  }

}
