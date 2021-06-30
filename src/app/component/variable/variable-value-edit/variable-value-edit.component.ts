import { Component, Input, OnInit } from '@angular/core';
import { faLaughBeam } from '@fortawesome/free-regular-svg-icons';
import { SelectItem } from 'primeng/api';
import { VALUE_TYPE } from 'src/app/enum/VALUE_TYPE';
import { VariableValue } from 'src/app/model/VariableValue';
import { UnstructuredCompIntService } from 'src/app/service/comp-int/unstructured-comp-int.service';

@Component({
  selector: '[app-variable-value-edit],app-variable-value-edit',
  templateUrl: './variable-value-edit.component.html',
  styleUrls: ['./variable-value-edit.component.scss']
})
export class VariableValueEditComponent implements OnInit {

  @Input()
  variableValue:VariableValue;

  value:any;

  displayInputText:boolean = false;
  displaySelectOneMenu:boolean = false;

  items: SelectItem[];

  constructor(protected unstructuredCompIntService:UnstructuredCompIntService,) { }

  ngOnInit(): void {
    this.items = [];
    for (let possibleValue of this.variableValue.variable.possibleValuesAsStrArr) {
      console.log(`possibleValue[${possibleValue}]`);
      this.items.push({
        label:possibleValue,
        value:possibleValue
      });
    }
    console.log(this.variableValue.variable.valueType);
    if (this.variableValue.variable.valueType == VALUE_TYPE.category) {
      this.displaySelectOneMenu = true;
    }
  }

  handleValueChange(event) {
    this.variableValue.valueAsStr = this.value;
    this.unstructuredCompIntService.announceChangeOnVariableValueManuallyFilled();
  }

}
