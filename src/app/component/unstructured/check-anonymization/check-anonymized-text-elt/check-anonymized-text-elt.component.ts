import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/api';
import {IDENTIFYING_VALUE_TYPE} from 'src/app/enum/IDENTIFYING_VALUE_TYPE'
import { TranslationService } from 'src/app/module/translation/service/translation.service';
import { UnstructuredCompIntService } from 'src/app/service/comp-int/unstructured-comp-int.service';

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

  applyManualTagToNextDocuments:boolean = false;

  anonymizationSelectItems: SelectItem[];
  partOfSpeechSelectItems : SelectItem[];

  anonymized:boolean = false;
  hidden:boolean = false;
  tableSeparator:boolean = false;

  operatorDecision:boolean = false;

  constructor(private unstructuredCompIntService:UnstructuredCompIntService,
              private translationService:TranslationService) { 
    
  }

  ngOnInit(): void {

    this.anonymizationSelectItems = [{label: 'Partie de nom propre', value: IDENTIFYING_VALUE_TYPE.name}, 
                                     {label: 'Partie de date', value: IDENTIFYING_VALUE_TYPE.date},
                                     {label: 'Partie de code postal', value: IDENTIFYING_VALUE_TYPE.zip_code},
                                     {label: 'Information non identifiante', value: null}];

    this.partOfSpeechSelectItems = [{value: 'ADJ', label: this.translationService.getTranslation('adjective_abrv')}, 
                                    {value: 'ADP', label: this.translationService.getTranslation('adposition_abrv')},
                                    {value: 'ADV', label: this.translationService.getTranslation('adverb_abrv')},
                                    {value: 'AUX', label: this.translationService.getTranslation('auxiliary_abrv')},
                                    {value: 'CCONJ', label: this.translationService.getTranslation('coordinating_conjunction_abrv')},
                                    {value: 'DET', label: this.translationService.getTranslation('determiner_abrv')},
                                    {value: 'INTJ', label: this.translationService.getTranslation('interjection_abrv')},
                                    {value: 'NOUN', label: this.translationService.getTranslation('noun_abrv')},
                                    {value: 'NUM', label: this.translationService.getTranslation('numeral_abrv')},
                                    {value: 'PART', label: this.translationService.getTranslation('particle_abrv')},
                                    {value: 'PRON', label: this.translationService.getTranslation('pronoun_abrv')},
                                    {value: 'PROPN', label: this.translationService.getTranslation('proper_noun_abrv')},
                                    {value: 'PUNCT', label: this.translationService.getTranslation('punctuation_abrv')},
                                    {value: 'SCONJ', label: this.translationService.getTranslation('subordinating_conjunction_abrv')},
                                    {value: 'SYM', label: this.translationService.getTranslation('symbol_abrv')},
                                    {value: 'VERB', label: this.translationService.getTranslation('verb_abrv')},
                                    {value: 'X', label: this.translationService.getTranslation('other_abrv')},];
 
    // Convert the identifying information type
    if (this.textElt.identifyingValueType != null) {
      this.textElt.identifyingValueType  = Number(IDENTIFYING_VALUE_TYPE[this.textElt.identifyingValueType]);
    }

    // Initialize the operatorDecision with what the server decision
    this.operatorDecision = this.textElt.tag;

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
    
    // If the operator has manually identified an element as a name and that 
    //   it is different from the initial tag, set some additional properties
    if (event != this.textElt.tag) {
      this.textElt.tag = event;
      this.textElt.manuallyTagged = true;
      this.textElt.applyManualTagToNextDocuments = this.applyManualTagToNextDocuments;
      this.textElt.identifyingValueType = null; // Workwound to the test for styling the text element
    } 
    this.overlayPanel.hide();
    this.unstructuredCompIntService.announceManualModificationToTextElt(this.textElt);
  }

}
