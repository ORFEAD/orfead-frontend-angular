import { Component, Input, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-check-anonymized-word',
  templateUrl: './check-anonymized-word.component.html',
  styleUrls: ['./check-anonymized-word.component.scss']
})
export class CheckAnonymizedWordComponent implements OnInit {

  @Input()
  wordData:any;

  anonymizationSelectItems: SelectItem[];

  anonymized:boolean = false;
  hidden:boolean = false;

  operatorDecision:boolean = false;

  display = false;

  constructor() { }

  ngOnInit(): void {

    this.anonymizationSelectItems = [{label: 'Non anonymisé', value: false}, {label: 'Anonymisé', value: true}];

    if (this.wordData.anonymized) {
      this.anonymized = true;
    }

    // Initialize the operatorDecision with what the server decision
    this.operatorDecision = this.anonymized;

    if (this.wordData.tag == "X") {
      this.hidden = true;
    }

  }

  displayDialog() {
    this.display = true;
  }

  handleOperatorDecision(event) {
    console.log(event);
    this.anonymized = event;
    this.display = false;
  }

}
