import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Dataset } from 'src/app/model/Dataset';
import { ExportCompIntServiceService } from 'src/app/service/comp-int/export-comp-int-service.service';
import { ExportService } from 'src/app/service/export.service';
import { ProcessingService } from 'src/app/service/processing.service';
import * as FileSaver from 'file-saver'; 

@Component({
  selector: 'app-page-export-dataset',
  templateUrl: './page-export-dataset.component.html',
  styleUrls: ['./page-export-dataset.component.scss']
})
export class PageExportDatasetComponent implements OnInit {

  dataset:Dataset;
  subscriptionToDatasetSelection: Subscription;

  constructor(private exportCompIntServiceService:ExportCompIntServiceService,
              private exportService:ExportService,
              private processingService:ProcessingService) { 

    this.subscriptionToDatasetSelection = this.exportCompIntServiceService.datasetSelected$.subscribe(
      dataset => {
        this.dataset = dataset;
        console.log(this.dataset);
      }
    );

  }

  ngOnInit(): void {
  }

  getExcel(){
    this.processingService.blockUI("PageExportDatasetComponent.getExcel()");
    this.exportService.getDatasetAsExcel(this.dataset).subscribe(result => {
      console.log("BACK");
      this.processingService.unblockUI("PageExportDatasetComponent.getExcel()");
      FileSaver.saveAs(
        result, 
        `${this.dataset.name}.xlsx`);
      });
  }

}
