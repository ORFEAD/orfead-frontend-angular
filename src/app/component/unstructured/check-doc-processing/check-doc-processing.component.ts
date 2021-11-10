import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Dataset } from 'src/app/model/Dataset';
import { VariableValue } from 'src/app/model/VariableValue';
import { TranslationService } from 'src/app/module/translation/service/translation.service';
import { UnstructuredCompIntService } from 'src/app/service/comp-int/unstructured-comp-int.service';
import { UnstructuredTopCompIntService } from 'src/app/service/comp-int/unstructured-top-comp-int.service';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { ProcessingService } from 'src/app/service/processing.service';
import { UINotificationService } from 'src/app/service/uinotification.service';
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
  cancelled:boolean = false;

  @Input()
  file:any;

  @Input()
  dataset:Dataset;

  readyForSerialization:boolean = false;
  saving:boolean = false;  

  anonymizationInProgress:boolean;
  variablesExtractionInProgress:boolean;

  resultOfAnonymizationAnalysis:any;
  resultOfVariablesExtractionAnalysis:any;

  variablesValuesManuallyFilled:VariableValue[];
  
  constructor(private processingService:ProcessingService,
              private unstructuredService:UnstructuredService,
              private unstructuredCompIntService:UnstructuredCompIntService,
              private unstructuredTopCompIntService:UnstructuredTopCompIntService,
              private variableService:VariableService,
              private translationService:TranslationService,
              private notificationService:UINotificationService) { 

    unstructuredCompIntService.manualModificationToTextElt$.subscribe(res => {
      this.readyForSerialization = false;
    });

    unstructuredCompIntService.resultOfVariablesExtraction$.subscribe(res => {
      this.checkIfReadyForSerialization();
    });

    unstructuredCompIntService.askTextEltsProcessing$.subscribe( res => {
      this.processTextElts(true);
    });  
    
    unstructuredCompIntService.changeOnVariableValueManuallyFilled$.subscribe(res => {
      this.checkIfReadyForSerialization();
    }); 

  }

  ngOnInit(): void {
    console.log(this.file);
    // this.processingService.blockUI("FilesBlocComponent.customUploader");
    this.anonymizationInProgress = true;
    this.initializeVariableValuesForVariablesFilledInByUser();
    this.processDocFile();
  }

  checkIfReadyForSerialization() {
    if (this.areRequiredExtractedVariablesValuesNotNull() 
      && this.areRequiredVariableValueManuallyFilledReady()) {
      this.readyForSerialization = true;
    } else {
      this.readyForSerialization = false;
    }
  }


  areRequiredVariableValueManuallyFilledReady():boolean {
        
    let missingRequiredVars = [];
    for (let vv of this.variablesValuesManuallyFilled) {
      console.log(vv);      
      if (vv.variable.required === true && (vv.valueAsStr == null || vv.valueAsStr.length == 0)) {
        missingRequiredVars.push(vv.variable.name);        
      }
    }

    if (missingRequiredVars.length > 0) {
      let warnMsg = `${this.translationService.getTranslation("the_following_required_variables_are_missing")} ${missingRequiredVars.join(", ")} `;      
      console.warn(warnMsg);
      this.notificationService.notifyWarn(warnMsg);
      return false;
    }
    return true;
  }

  areRequiredExtractedVariablesValuesNotNull():boolean{
    console.log(this.resultOfVariablesExtractionAnalysis);

    let missingRequiredVars = [];

    // If the extraction is not ready, return false
    if (this.resultOfVariablesExtractionAnalysis == null) {
      return false;
    }

    for (let vDef of this.getAllVarDefsFromTpl()) {
      if (vDef.required === true && vDef.value == null) {
        missingRequiredVars.push(vDef.name);               
      }
    }

    if (missingRequiredVars.length > 0) {
      let warnMsg = `${this.translationService.getTranslation("the_following_required_variables_are_missing")} ${missingRequiredVars.join(", ")} `;      
      this.notificationService.notifyWarn(warnMsg);
      return false;
    }
    return true;
  }

  handleClickOnSaveButton(evt) {
    this.serializeVariablesValues();
    // this.processTextElts(false);
  }

  handleClickOnCancelButton(evt) {
    this.cancelled = true;
    this.unstructuredTopCompIntService.announceDocRemovedFromProcessingStack(this.file);
  }

  initializeVariableValuesForVariablesFilledInByUser() {
    this.variableService.getVariablesFilledInByUser(this.dataset.id).subscribe(res => {
      if (res != null) {
        console.log(res);
        this.variablesValuesManuallyFilled = [];
        for (let v of res) {
          let variableValue = new VariableValue({});
          variableValue.variable = v;
          this.variablesValuesManuallyFilled.push(variableValue);
        }
      }
    }
    );
  }

  processDocFile() {
    this.unstructuredTopCompIntService.announceDocStartedProcessingStack(this.file);

    this.unstructuredService.processDocFile(this.file,this.dataset.id).subscribe(res => {


      this.variablesExtractionInProgress = false;
      this.anonymizationInProgress = false;

      if (res != null) {
        console.log(res);

        this.resultOfAnonymizationAnalysis = res.textElts;
        this.resultOfVariablesExtractionAnalysis = res.tpl;        

        this.unstructuredCompIntService.announceResultOfVariablesExtraction(res.tpl);
        this.unstructuredTopCompIntService.announceDocDoneProcessingStack(this.file,"OK");
      } else {
        this.unstructuredTopCompIntService.announceDocDoneProcessingStack(this.file,"NOK");
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
    
    this.unstructuredTopCompIntService.announceDocStartedProcessingStack(this.file);
    
    this.unstructuredService.processTextElts(this.resultOfAnonymizationAnalysis,
                                             [], // this.manuallyTaggedElts,
                                             this.dataset.id,
                                             exitBeforeSerialization).subscribe(res => {

      this.variablesExtractionInProgress = false;
      this.anonymizationInProgress = false;

      if (res != null) {
        console.log(res);

        let successMsg = `${this.file.name} ${this.translationService.getTranslation("@@variable_extration_succeeded")}`;
        console.log(successMsg); 
        this.notificationService.notifySuccess(successMsg);

        if (exitBeforeSerialization) {
          this.resultOfAnonymizationAnalysis = res.textElts;
          this.resultOfVariablesExtractionAnalysis = res.tpl;
          this.unstructuredCompIntService.announceResultOfVariablesExtraction(res.tpl);
          this.unstructuredTopCompIntService.announceDocDoneProcessingStack(this.file,"OK");
        } else {
          this.saved = true;
        }
        
      } else {
        this.unstructuredTopCompIntService.announceDocDoneProcessingStack(this.file,"NOK");
      }
    });
  }

  serializeVariablesValues() {
    this.saving = true;
    this.unstructuredService.serializeVariablesValues(this.resultOfVariablesExtractionAnalysis,
                                                      this.resultOfAnonymizationAnalysis,
                                                      this.variablesValuesManuallyFilled,
                                                      this.dataset.id).subscribe(res => {
        this.saving = true;
        if (res != null) {
          this.saved = true;
          this.unstructuredTopCompIntService.announceDocRemovedFromProcessingStack(this.file);
        }
    });
  }

  getAllVarDefsFromTpl() {
    let _vars = [];
    let _tpl = this.resultOfVariablesExtractionAnalysis;
    for (let b of _tpl["blocks"]) {
      _vars = _vars.concat(b["variables"]);
    }
    _vars = _vars.concat(_tpl.preProcessing.variables);
    _vars = _vars.concat(_tpl.postProcessing.variables);      
    return _vars;
  }
     

}
