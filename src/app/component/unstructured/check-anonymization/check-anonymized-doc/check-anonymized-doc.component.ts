import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Dataset } from 'src/app/model/Dataset';
import { UnstructuredCompIntService } from 'src/app/service/comp-int/unstructured-comp-int.service';
import { ProcessingService } from 'src/app/service/processing.service';
import { UnstructuredService } from 'src/app/service/unstructured.service';

@Component({
  selector: 'app-check-anonymized-doc',
  templateUrl: './check-anonymized-doc.component.html',
  styleUrls: ['./check-anonymized-doc.component.scss']
})
export class CheckAnonymizedDocComponent implements OnInit {

  @Input() 
  analysis:any;

  @Input()
  dataset:Dataset;

  @Input()
  inProgress:boolean;

  manuallyTaggedElts:any[] = [];
  
  constructor(private processingService:ProcessingService,
              private unstructuredCompIntService:UnstructuredCompIntService,
              private unstructuredService:UnstructuredService) { 
             
  }
  
  ngOnInit(): void {
    
  }

  ngOnChanges(): void {
    if (this.analysis != null) {
      // this.fileName = this.analysis.fileName;
      // this.fileAnalysis = this.analysis.fileAnalysis;
    }

  }



}
