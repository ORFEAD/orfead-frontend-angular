import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Dataset } from 'src/app/model/Dataset';
import { UnstructuredCompIntService } from 'src/app/service/comp-int/unstructured-comp-int.service';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { ProcessingService } from 'src/app/service/processing.service';

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

  variables = [];

  constructor(private fileUploadService:FileUploadService,) { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    if (this.analysis != null) {
      console.log(this.analysis);

      this.variables = this.variables.concat(this.analysis.preProcessing.variables);
      this.variables =  this.variables.concat(this.analysis.postProcessing.variables);
      for (let block of this.analysis.blocks) {
        this.variables = this.variables.concat(block.variables);
      }

    }

  }

}
