import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/api';
import {IDENTIFYING_VALUE_TYPE} from 'src/app/enum/IDENTIFYING_VALUE_TYPE'

@Component({
  selector: 'app-check-anonymized-text-elt',
  templateUrl: './check-anonymized-text-elt.component.html',
  styleUrls: ['./check-anonymized-text-elt.component.scss']
})
export class CheckAnonymizedTextEltComponent implements OnInit {

  @Input()
  textElt:any;

  @ViewChild("op")
  overlayPanel:any;

  applyManualFixToNextDocuments:boolean = false;

  anonymizationSelectItems: SelectItem[];

  anonymized:boolean = false;
  hidden:boolean = false;
  tableSeparator:boolean = false;

  operatorDecision:boolean = false;

  constructor() { }

  ngOnInit(): void {

    this.anonymizationSelectItems = [{label: 'Partie de nom propre', value: IDENTIFYING_VALUE_TYPE.name}, 
                                     {label: 'Partie de date', value: IDENTIFYING_VALUE_TYPE.date},
                                     {label: 'Partie de code postal', value: IDENTIFYING_VALUE_TYPE.zip_code},
                                     {label: 'Information non identifiante', value: null}];
 
    // Convert the identifying information type
    if (this.textElt.identifyingValueType != null) {
      this.textElt.identifyingValueType  = Number(IDENTIFYING_VALUE_TYPE[this.textElt.identifyingValueType]);
      console.log(this.textElt);
    }

    // Initialize the operatorDecision with what the server decision
    this.operatorDecision = this.textElt.identifyingValueType;

    if (this.textElt.value.includes("SPCLxFORMAT")) {
      this.hidden = true;
    } else if (this.textElt.value.includes("SPCLxTABLE")) {
      this.tableSeparator = true;
    }

  }

  displayDialog(event) {
    this.overlayPanel.show(event);
  }

  handleOperatorDecision(event) {
    console.log(event);
    this.textElt.identifyingValueType = event;
    this.overlayPanel.hide();
  }

}
