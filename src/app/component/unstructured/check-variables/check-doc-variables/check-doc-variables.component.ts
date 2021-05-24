import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Dataset } from 'src/app/model/Dataset';
import { TranslationService } from 'src/app/module/translation/service/translation.service';
import { UnstructuredCompIntService } from 'src/app/service/comp-int/unstructured-comp-int.service';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { ProcessingService } from 'src/app/service/processing.service';
import { Utils } from 'src/app/util/utils';

@Component({
  selector: 'app-check-doc-variables',
  templateUrl: './check-doc-variables.component.html',
  styleUrls: ['./check-doc-variables.component.scss']
})
export class CheckDocVariablesComponent implements OnInit {

  @Input()
  analysis:any;
  
  @Input()
  inProgress:boolean = true;

  needRefresh:boolean = false;

  variables = [];

  variablesForTableDisplay = [];
  cols: any[];

  constructor(private fileUploadService:FileUploadService,
              private unstructuredCompIntService:UnstructuredCompIntService,
              private translationService:TranslationService) { 
    unstructuredCompIntService.manualModificationToTextElt$.subscribe( res => {
        this.needRefresh = true;
      } 
    );
  }

  ngOnInit(): void {

    this.cols = [
      {
        field:"name",
        header:this.translationService.getTranslation("name"),
        // attributeType:"text",
        // exactMatch:false,
        columnIsAvailable:true,
        columnIsDisplayed:true,
        filterIsActive:false,
        minimumCharactersNeeded:2,
        width:"10em",
        filterValue:null,
        sorting:null // null, 1, -1
      },
      {
        field:"valueType",
        header:this.translationService.getTranslation("valueType"),
        // attributeType:"text",
        // exactMatch:false,
        columnIsAvailable:true,
        columnIsDisplayed:true,
        filterIsActive:false,
        minimumCharactersNeeded:2,
        width:"5em",
        filterValue:null,
        sorting:null // null, 1, -1
      },
      {
        field:"anonymizationType",
        header:this.translationService.getTranslation("anonymizationType"),
        // attributeType:"text",
        // exactMatch:false,
        columnIsAvailable:true,
        columnIsDisplayed:true,
        filterIsActive:false,
        minimumCharactersNeeded:2,
        width:"10em",
        filterValue:null,
        sorting:null // null, 1, -1
      },      
      {
        field:"value",
        header:this.translationService.getTranslation("value"),
        // attributeType:"text",
        // exactMatch:false,
        columnIsAvailable:true,
        columnIsDisplayed:true,
        filterIsActive:false,
        minimumCharactersNeeded:2,
        width:"10em",
        filterValue:null,
        sorting:null // null, 1, -1
      },
      {
        field:"anonymizedValue",
        header:this.translationService.getTranslation("anonymizedValue"),
        // attributeType:"text",
        // exactMatch:false,
        columnIsAvailable:true,
        columnIsDisplayed:true,
        filterIsActive:false,
        minimumCharactersNeeded:2,
        width:"10em",
        filterValue:null,
        sorting:null // null, 1, -1
      },
      {
        field:"pseudoValue",
        header:this.translationService.getTranslation("pseudoValue"),
        // attributeType:"text",
        // exactMatch:false,
        columnIsAvailable:true,
        columnIsDisplayed:true,
        filterIsActive:false,
        minimumCharactersNeeded:2,
        width:"5em",
        filterValue:null,
        sorting:null // null, 1, -1
      },
      {
        field:"required",
        header:this.translationService.getTranslation("required"),
        // attributeType:"text",
        // exactMatch:false,
        columnIsAvailable:true,
        columnIsDisplayed:true,
        filterIsActive:false,
        minimumCharactersNeeded:2,
        width:"5em",
        filterValue:null,
        sorting:null // null, 1, -1
      },
      {
        field:"serialize",
        header:this.translationService.getTranslation("serialized_to_database"),
        // attributeType:"text",
        // exactMatch:false,
        columnIsAvailable:true,
        columnIsDisplayed:true,
        filterIsActive:false,
        minimumCharactersNeeded:2,
        width:"5em",
        filterValue:null,
        sorting:null // null, 1, -1
      },
      
  ]

  }

  ngOnChanges(): void {
    if (this.analysis != null) {
      console.log(this.analysis);

      // Extract the variables from the blocks the preProcessing, postProcessing
      this.variables = [];
      this.variables = this.variables.concat(this.analysis.preProcessing.variables);
      this.variables =  this.variables.concat(this.analysis.postProcessing.variables);
      for (let block of this.analysis.blocks) {
        this.variables = this.variables.concat(block.variables);
      }

      // Transform the variables for display
      this.variablesForTableDisplay = [];
      for (let v of this.variables) {
        
        // Add the attributes that don't require adjustment
        let variablesForTableDisplay = {
          name: v.name,
          value: v.value,
          anonymizedValue:v.anonymizedValue,
          valueType: v.valueType,
          anonymizationType:v.anonymizationType,
          required: v.required,
          serialize: v.serialize,
          pseudoValue:null,
        };

        

        if ('pseudonymizationMapping' in v){
          variablesForTableDisplay.pseudoValue = v.pseudonymizationMapping.pseudoValue;
        }

        
        this.variablesForTableDisplay.push(variablesForTableDisplay);
        // this.variablesForTableDisplay.sort((a, b) => (a.name > b.name) ? 1 : -1)
        this.variablesForTableDisplay.sort((a, b) => (a.required < b.required) ? 1 : -1)
      }      

    }
  }

  handleClickOnRefreshButton(evt) {
    this.unstructuredCompIntService.askTextEltsProcessing(true);
  }
  

}
