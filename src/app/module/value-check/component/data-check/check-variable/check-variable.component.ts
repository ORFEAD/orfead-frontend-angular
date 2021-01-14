import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Dataset } from 'src/app/model/Dataset';
import { Variable } from 'src/app/model/Variable';
import { ProcessingService } from 'src/app/service/processing.service';
import { DataCheckService } from '../../../service/data-check.service';
import { ValueCheck } from '../../../model/ValueCheck';
import { VALUE_TYPE } from 'src/app/enum/VALUE_TYPE';
import { UINotificationService } from 'src/app/service/uinotification.service';
import { TranslationService } from 'src/app/module/translation/service/translation.service';

@Component({
  selector: 'unstructured-data-check-variable',
  templateUrl: './check-variable.component.html',
  styleUrls: ['./check-variable.component.scss']
})
export class CheckVariableComponent implements OnInit {

  variableValue:any;
  srcValues:any[] = [];
  varGenDef:any;
  variable:any;
  valueChecksResult:any;

  valueIsNotMissing:boolean;
  
  operatorValue:any;

  finalChecksOnly:boolean;

  canDisplayInput:boolean = false;
  canDisplayBooleanInput:boolean = false;
  canDisplayContinuousInput:boolean = false;
  canDisplayNextValueButton:boolean = false;
  canDisplayPreviousValueButton:boolean = false;

  boolSelectItems:SelectItem[] = [];

  displayBlockUIOverlay:boolean = false;

  constructor(private route: ActivatedRoute,
              private processingService:ProcessingService,
              private translationService:TranslationService,
              private dataCheckService:DataCheckService,
              private uiNotificationService:UINotificationService) { }


  ngOnInit() {
    this.getOneValueToCheckWithSrcValues();    
  }
  
  getOneValueToCheckWithSrcValues(): void {
    const dataset_id = this.route.snapshot.paramMap.get('dataset_id');   
    const variable_id = this.route.snapshot.paramMap.get('variable_id');
    
    this.finalChecksOnly = this.route.snapshot.paramMap.get('final-checks-only') == "true" ? true : false;

    console.log(`dataset_id[${dataset_id}], variable_id[${variable_id}]`);
    let dataset = new Dataset({id:dataset_id});   
    let variable = new Variable({id:variable_id, dataset: dataset});
    // console.log(variable);

    this.blockActions();

    this.dataCheckService.getOneValueToCheckWithSrcValues(variable, this.finalChecksOnly).subscribe(res => {

      this.unblockActions();

      console.log(res);
      if (res != null && res.variableValue != null) {
        // console.log(res);
        this.variableValue = res['variableValue'];
        this.srcValues = res['srcValues'];
        this.varGenDef = res['varGenDef'];
        this.valueChecksResult = res['valueChecksResult'];
        this.variable = this.variableValue.variable;
        console.log(this.varGenDef);

        // Load the select items
        // This is done here because the choice can be different
        //   if ValueCheckResult.finalCheckNeeded == true
        this.getBoolSelectItems();

        // Reset the operator value and display booleans
        this.operatorValue = null;
        this.valueIsNotMissing = null;

        this.canDisplayInput = false;
        this.canDisplayBooleanInput = false;
        this.canDisplayContinuousInput = false;
        this.canDisplayNextValueButton = false;
        this.canDisplayPreviousValueButton = false;

      } else {
        this.uiNotificationService.notifyWarn("Nothing to display");
      }
    });   
  }

  blockActions() {
    this.displayBlockUIOverlay = true;
  }

  unblockActions() {
    this.displayBlockUIOverlay = false;
  }

  getBoolSelectItems() {
    
    this.boolSelectItems = [
      {label:this.translationService.getTranslation("choose_a_value"), value:null},
      {label:this.translationService.getTranslation("true"),
      value:true},
      {label:this.translationService.getTranslation("false"),
      value:false}      
    ]
    
    // Only allow the selection of 'idk' in the following cases
    if (this.valueChecksResult == null
      || (this.valueChecksResult != null 
       && this.valueChecksResult.finalCheckNeeded === false)) {
      this.boolSelectItems.push({label:this.translationService.getTranslation("user_doesnt_know"),
                                  value:"_user_doesnt_know"})
    } 

  }

  valueIsNotMissingHandler(event:any) {

    this.operatorValue = null;
  
    this.updateDisplayBooleans();

    if (this.valueIsNotMissing == false) {
      this.operatorValue = null;
    }

  }

  handleChangeOntargetValue(event:any) {
    this.updateDisplayBooleans();
  }

  updateDisplayBooleans() {

    console.log(`this.valueIsNotMissing[${this.valueIsNotMissing}]`);

    // Booleans for displaying the input values
    if (this.valueIsNotMissing) {
      this.canDisplayInput = true;
      if (this.variable.valueType == VALUE_TYPE.bool) {
        this.canDisplayBooleanInput = true;
      } else if (this.variable.valueType == VALUE_TYPE.continuous) {
        this.canDisplayContinuousInput = true;
      }
    } else {
      this.canDisplayInput = false;
    }

    // Boolean for displaying the 'next value' button
    // If user says that the value is missing => display the next button
    // If user says that the value is not missing and that a value is filled in => display the next button
    if (this.valueIsNotMissing == false) {
      this.canDisplayNextValueButton = true;
    } else {

      if (this.operatorValue != null) {
        this.canDisplayNextValueButton = true;
      } else {
        this.canDisplayNextValueButton = false;
      }

    }
  }

  handleClickOnBtnSaveAndGoToNextValue(event) {
    let valueCheck = new ValueCheck({});
    valueCheck.variableValue = this.variableValue;

    if (this.valueIsNotMissing){
      valueCheck.valueAsStr = this.operatorValue.toString();
    }

    this.blockActions();

    this.dataCheckService.saveValueCheck(valueCheck).subscribe(res => {
      this.unblockActions();
      if (res != null) {
        // console.log(res);
        this.uiNotificationService.notifySuccess("@@value_check_saved");
        this.getOneValueToCheckWithSrcValues();
      }
    });
    

  }

}
