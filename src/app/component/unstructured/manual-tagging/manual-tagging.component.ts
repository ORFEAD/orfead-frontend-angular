import { Component, Input, OnInit } from '@angular/core';
import { VariableValue } from 'src/app/model/VariableValue';

@Component({
  selector: 'app-manual-tagging',
  templateUrl: './manual-tagging.component.html',
  styleUrls: ['./manual-tagging.component.scss']
})
export class ManualTaggingComponent implements OnInit {

  @Input()
  variablesValues:VariableValue[];

  constructor() { }

  ngOnInit(): void {
  }

}
