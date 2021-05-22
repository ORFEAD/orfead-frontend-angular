import { Component, Input, OnInit } from '@angular/core';
import { VariableValue } from 'src/app/model/VariableValue';

@Component({
  selector: '[app-variable-value-edit],app-variable-value-edit',
  templateUrl: './variable-value-edit.component.html',
  styleUrls: ['./variable-value-edit.component.scss']
})
export class VariableValueEditComponent implements OnInit {

  @Input()
  variableValue:VariableValue;

  constructor() { }

  ngOnInit(): void {
  }

}
