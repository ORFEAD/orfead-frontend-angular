import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UnstructuredCompIntService } from 'src/app/service/comp-int/unstructured-comp-int.service';
import { ProcessingService } from 'src/app/service/processing.service';

@Component({
  selector: 'app-check-anonymized-doc',
  templateUrl: './check-anonymized-doc.component.html',
  styleUrls: ['./check-anonymized-doc.component.scss']
})
export class CheckAnonymizedDocComponent implements OnInit {

  @Input() 
  analysis:any;

  // fileName:string;

  // fileAnalysis:any;

  @Input()
  inProgress:boolean;
  
  constructor(private processingService:ProcessingService,
              private componentsInteractionService:UnstructuredCompIntService) { 
        
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
