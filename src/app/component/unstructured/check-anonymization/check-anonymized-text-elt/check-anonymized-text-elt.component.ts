import { Component, Input, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-check-anonymized-text-elt',
  templateUrl: './check-anonymized-text-elt.component.html',
  styleUrls: ['./check-anonymized-text-elt.component.scss']
})
export class CheckAnonymizedTextEltComponent implements OnInit {

  @Input()
  textElt:any;

  anonymizationSelectItems: SelectItem[];

  anonymized:boolean = false;
  hidden:boolean = false;
  tableSeparator:boolean = false;

  operatorDecision:boolean = false;

  display = false;

  constructor() { }

  ngOnInit(): void {

    this.anonymizationSelectItems = [{label: 'Non anonymisé', value: false}, {label: 'Anonymisé', value: true}];

    if (this.textElt.partOfName || this.textElt.partOfDate) {
      this.anonymized = true;
    }

    // Initialize the operatorDecision with what the server decision
    this.operatorDecision = this.anonymized;

    if (this.textElt.value.includes("SPCLxFORMAT")) {
      this.hidden = true;
    } else if (this.textElt.value.includes("SPCLxTABLE")) {
      this.tableSeparator = true;
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
