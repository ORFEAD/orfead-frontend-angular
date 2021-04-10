import { Component, OnInit } from '@angular/core';
import { ProcessingService } from 'src/app/service/processing.service';
import { Subscription } from 'rxjs';
import { UnstructuredCompIntService } from 'src/app/service/comp-int/unstructured-comp-int.service';
import { Dataset } from 'src/app/model/Dataset';

@Component({
  selector: 'app-unstructured-dataset-upload',
  templateUrl: './unstructured-dataset-upload.component.html',
  styleUrls: ['./unstructured-dataset-upload.component.scss']
})
export class UnstructuredDatasetUploadComponent implements OnInit {

  dataset:Dataset;
  analysesOfDocFilesForAnonymization:any[] = [];
  filesForProcessing:any[] = [];

  subscriptionToDatasetSelection: Subscription;
  subscriptionToFileInTreatment: Subscription;


  constructor(private processingService:ProcessingService,
              private componentsInteractionService:UnstructuredCompIntService) 
              {

    this.subscriptionToDatasetSelection = this.componentsInteractionService.datasetSelected$.subscribe(
      dataset => {
        this.dataset = dataset;
      }
    );

    this.subscriptionToFileInTreatment = 
    this.componentsInteractionService.docForProcessing$.subscribe(
      f => {
        this.filesForProcessing.push(f);
      }
    );

  }  

  ngOnInit(): void {
    
  }

  

}
