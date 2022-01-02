import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-params',
  templateUrl: './product-params.component.html',
  styleUrls: ['./product-params.component.scss'],
})
export class ProductParamsComponent implements OnInit {
  @Output() methodTypeEvent = new EventEmitter<methodType>();
  methodType = methodType;
  constructor() {}

  ngOnInit(): void {}

  onClick(type: methodType) {
    this.methodTypeEvent.emit(type);
  }
}

export enum methodType {
  'update' = 'update',
  'delete' = 'delete',
}
