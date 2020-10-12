import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng';
import { Dataset } from 'src/app/model/Dataset';
import { Variable } from 'src/app/model/Variable';
import { ProcessingService } from 'src/app/service/processing.service';
import {DataCheckService} from '../../../service/data-check.service';

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

  valueIsNotMissing:boolean;
  
  boolValue:boolean;
  integerValue:boolean;
  numericValue:boolean;

  canDisplayInput:boolean = false;
  canDisplayBooleanInput:boolean = false;
  canDisplayIntegerInput:boolean = false;
  canDisplayNextValueButton:boolean = false;
  canDisplayPreviousValueButton:boolean = false;

  boolSelectItems:SelectItem[] = [];

  constructor(private route: ActivatedRoute,
              private processingService:ProcessingService,
              private dataCheckService:DataCheckService) { }


  ngOnInit() {

    this.getBoolSelectItems();

    this.getOneValueToCheckWithSrcValues();
    
  }
  
  getOneValueToCheckWithSrcValues(): void {
    const dataset_id = this.route.snapshot.paramMap.get('dataset_id');   
    const variable_id = this.route.snapshot.paramMap.get('variable_id');   
    console.log(`dataset_id[${dataset_id}], variable_id[${variable_id}]`);
    let dataset = new Dataset({id:dataset_id});   
    let variable = new Variable({id:variable_id, dataset: dataset});
    console.log(variable);
    this.dataCheckService.getOneValueToCheckWithSrcValues(variable).subscribe(res => {
      if (res != null) {
        console.log(res);
        this.variableValue = res['variableValue'];
        this.srcValues = res['srcValues'];
        this.varGenDef = res['varGenDef'];
        this.variable = this.variableValue.variable;

        

      }
    });   
  }


  getBoolSelectItems() {
    this.boolSelectItems = [
      {label:"",
       value:null},
      {label:"true",
       value:true},
      {label:"false",
       value:false}
    ]
  }

  valueIsNotMissingHandler(event:any) {
  
    this.updateDisplayBooleans();

    if (this.valueIsNotMissing == false) {
      this.numericValue = null;
      this.boolValue = null;
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
      if (this.variable.valueType.toLowerCase().includes("bool")) {
        this.canDisplayBooleanInput = true;
      } else if (this.variable.valueType.toLowerCase().includes("int")) {
        this.canDisplayIntegerInput = true;
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
      if (this.variable.valueType.toLowerCase().includes("bool")
        && this.boolValue != null) {
          this.canDisplayNextValueButton = true;
      } else if (this.variable.valueType.toLowerCase().includes("int")
        && this.integerValue != null) {
           this.canDisplayNextValueButton = true;
      } else {
        this.canDisplayNextValueButton = false;
      }
    }




  }

}
