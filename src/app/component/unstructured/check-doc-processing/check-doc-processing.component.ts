import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Dataset } from 'src/app/model/Dataset';
import { UnstructuredCompIntService } from 'src/app/service/comp-int/unstructured-comp-int.service';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { ProcessingService } from 'src/app/service/processing.service';

@Component({
  selector: 'app-check-doc-processing',
  templateUrl: './check-doc-processing.component.html',
  styleUrls: ['./check-doc-processing.component.scss']
})
export class CheckDocProcessingComponent implements OnInit {

  saved:boolean = false;

  @Input()
  file:any;

  @Input()
  dataset:Dataset;

  anonymizationInProgress:boolean;
  variablesExtractionInProgress:boolean;

  resultOfAnonymizationAnalysis:any;
  resultOfVariablesExtractionAnalysis:any;
  
  constructor(private processingService:ProcessingService,
              private fileUploadService:FileUploadService,
              private unstructuredCompIntService:UnstructuredCompIntService) { 

  }

  handleClickOnSaveButton(evt) {
    this.saved = true;
  }

  ngOnInit(): void {

    console.log(this.file);

    

    // this.processingService.blockUI("FilesBlocComponent.customUploader");
    this.anonymizationInProgress = true;

    this.fileUploadService.processDocFile(this.file,this.dataset.id).subscribe(res => {
      if (res != null) {
        console.log(res);  
        this.resultOfAnonymizationAnalysis = res.textElts;
        this.resultOfVariablesExtractionAnalysis = res.tpl;
        this.variablesExtractionInProgress = false;
        this.anonymizationInProgress = false;
      }
    });

    // this.fileUploadService.analyzeDocFileForAnonymization(this.file,this.dataset.id).subscribe(res => {
        
    //   if (res != null) {
    //       this.resultOfAnonymizationAnalysis = res;


    //       // If the anonymization is successful, start the extraction of variables
    //       this.variablesExtractionInProgress = true;
    //       this.fileUploadService.analyzeDocFileForVariablesExtraction().subscribe(res => {
        
    //         if (res != null) {
    //             this.resultOfVariablesExtractionAnalysis = res;
    //         }
      
    //         this.variablesExtractionInProgress = false;
      
    //       });
    //   }

    //   this.anonymizationInProgress = false;

    // });

  }

}
