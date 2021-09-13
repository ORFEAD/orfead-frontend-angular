import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Dataset } from 'src/app/model/Dataset';
import { ExportCompIntServiceService } from 'src/app/service/comp-int/export-comp-int-service.service';
import { ExportService } from 'src/app/service/export.service';
import { ProcessingService } from 'src/app/service/processing.service';
import * as FileSaver from 'file-saver'; 
import { SelectItem } from 'primeng/api';
import { VariableService } from 'src/app/service/variable.service';
import { Variable } from 'src/app/model/Variable';


@Component({
  selector: 'app-page-export-dataset',
  templateUrl: './page-export-dataset.component.html',
  styleUrls: ['./page-export-dataset.component.scss']
})
export class PageExportDatasetComponent implements OnInit {

  dataset:Dataset;
  subscriptionToDatasetSelection: Subscription;
  exportLevel:number=1;
  exportLevelSelectItems: SelectItem[]=[];
  variables:Variable[] = [];

  resourcesLoadedChecker = {
    resourcesAreLoaded: false,
    resourcesLoaded:{
        variables: false
    }    
  }

  constructor(private exportCompIntServiceService:ExportCompIntServiceService,
              private exportService:ExportService,
              private variableService:VariableService,
              private processingService:ProcessingService) { 

    this.subscriptionToDatasetSelection = this.exportCompIntServiceService.datasetSelected$.subscribe(
      dataset => {
        this.dataset = dataset;
        this.getVariables();
      }
    );

  }

  ngOnInit(): void {
  }

  getExcel(){
    this.processingService.blockUI("PageExportDatasetComponent.getExcel()");
    this.exportService.getDatasetAsExcel(this.dataset,this.exportLevel).subscribe(result => {
      this.processingService.unblockUI("PageExportDatasetComponent.getExcel()");
      FileSaver.saveAs(
        result, 
        `${this.dataset.name}.xlsx`);
      });
  }

  getVariables() {
    this.variableService.getVariables(this.dataset.id).subscribe(res => {
      this.variables = res;
      let exportLevels = this.variables.map(x => x.exportLevel);
      let maxExportLevel = Math.max(...exportLevels);
      this.exportLevelSelectItems = [];
      for (let i = 1; i <= maxExportLevel; i++) {
         this.exportLevelSelectItems.push({
           label: i.toString(),
           value:i
         });
      }

      this.resourcesLoadedChecker.resourcesLoaded.variables = true;
      this.updateResourcesLoaded();

    });
  }

  updateResourcesLoaded():void {
    
    for (let k in this.resourcesLoadedChecker) {
      // console.log(this.resourcesLoadedChecker[k]);
      if (this.resourcesLoadedChecker[k] instanceof Object) {
        for (let ksub in this.resourcesLoadedChecker[k]) {
            if (this.resourcesLoadedChecker[k][ksub] == false) {
                this.resourcesLoadedChecker.resourcesAreLoaded = false;
                return;
            }
        }
      }         
    }   
    this.resourcesLoadedChecker.resourcesAreLoaded = true;
    // this.initializeSelected();

  }

}
