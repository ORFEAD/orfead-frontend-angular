import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Dataset } from 'src/app/model/Dataset';
import { VariableValue } from 'src/app/model/VariableValue';
import { UnstructuredCompIntService } from 'src/app/service/comp-int/unstructured-comp-int.service';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { ProcessingService } from 'src/app/service/processing.service';
import { UnstructuredService } from 'src/app/service/unstructured.service';
import { VariableService } from 'src/app/service/variable.service';

@Component({
  selector: 'app-check-doc-processing',
  templateUrl: './check-doc-processing.component.html',
  styleUrls: ['./check-doc-processing.component.scss'],
  providers: [UnstructuredCompIntService] // Creates a separate instance of the service for
                                          //   the component and its children. If not some we
                                          //   would need to implement some security checks to
                                          //   ensure that the component does not react to things
                                          //   happening in the neighbor component
})
export class CheckDocProcessingComponent implements OnInit {

  saved:boolean = false;

  @Input()
  file:any;

  @Input()
  dataset:Dataset;

  readyForSerialization:boolean = false;

  anonymizationInProgress:boolean;
  variablesExtractionInProgress:boolean;

  resultOfAnonymizationAnalysis:any;
  resultOfVariablesExtractionAnalysis:any;

  variableValuesManuallyFilled:VariableValue[];
  
  constructor(private processingService:ProcessingService,
              private unstructuredService:UnstructuredService,
              private unstructuredCompIntService:UnstructuredCompIntService,
              private variableService:VariableService) { 

    unstructuredCompIntService.manualModificationToTextElt$.subscribe(res => {
      this.readyForSerialization = false;
    });

    unstructuredCompIntService.resultOfVariablesExtraction$.subscribe(res => {
      this.readyForSerialization = true;
    });

    unstructuredCompIntService.askTextEltsProcessing$.subscribe( res => {
      this.processTextElts(true);
    } 
    );   

  }

  ngOnInit(): void {
    console.log(this.file);
    // this.processingService.blockUI("FilesBlocComponent.customUploader");
    this.anonymizationInProgress = true;
    this.initializeVariableValuesForVariablesFilledInByUser();
    // this.processDocFile();
  }

  handleClickOnSaveButton(evt) {
    this.serializeVariablesValues();
    // this.processTextElts(false);
  }

  initializeVariableValuesForVariablesFilledInByUser() {
    this.variableService.getVariablesFilledInByUser(this.dataset.id).subscribe(res => {
      if (res != null) {
        console.log(res);
        this.variableValuesManuallyFilled = [];
        for (let v of res) {
          let variableValue = new VariableValue({});
          variableValue.variable = v;
          this.variableValuesManuallyFilled.push(variableValue);
        }
      }
    }
    );
  }

  processDocFile() {
    this.unstructuredService.processDocFile(this.file,this.dataset.id).subscribe(res => {

      this.variablesExtractionInProgress = false;
      this.anonymizationInProgress = false;

      if (res != null) {
        console.log(res);

        this.resultOfAnonymizationAnalysis = res.textElts;
        this.resultOfVariablesExtractionAnalysis = res.tpl;        

        this.unstructuredCompIntService.announceResultOfVariablesExtraction(res.tpl);
      }
    });
  }

  processTextElts(exitBeforeSerialization:boolean) {

    // let counter = 0;
    // for (let t of this.resultOfAnonymizationAnalysis) {
    //   console.log(t);
    //   if (counter++ > 2) break;
    // }
    // return;
    
    this.unstructuredService.processTextElts(this.resultOfAnonymizationAnalysis,
                                             [], // this.manuallyTaggedElts,
                                             this.dataset.id,
                                             exitBeforeSerialization).subscribe(res => {

      this.variablesExtractionInProgress = false;
      this.anonymizationInProgress = false;

      if (res != null) {
        console.log(res);

        if (exitBeforeSerialization) {
          this.resultOfAnonymizationAnalysis = res.textElts;
          this.resultOfVariablesExtractionAnalysis = res.tpl;
          this.unstructuredCompIntService.announceResultOfVariablesExtraction(res.tpl);
        } else {
          this.saved = true;
        }
        
      }
    });
  }

  serializeVariablesValues() {
    this.unstructuredService.serializeVariablesValues(this.resultOfVariablesExtractionAnalysis,
                                                      this.resultOfAnonymizationAnalysis,
                                                      this.dataset.id).subscribe(res => {
        if (res != null) {
          this.saved = true;
        }
    });

  }

  

}
