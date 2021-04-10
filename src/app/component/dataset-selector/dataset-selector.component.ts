import { Component, Input, OnInit } from '@angular/core';
import { Dataset } from 'src/app/model/Dataset';
import {DatasetService} from 'src/app/service/dataset.service';
import { UnstructuredCompIntService } from 'src/app/service/comp-int/unstructured-comp-int.service';
 
@Component({
  selector: 'app-dataset-selector',
  templateUrl: './dataset-selector.component.html',
  styleUrls: ['./dataset-selector.component.scss']
})
export class DatasetSelectorComponent implements OnInit {

  @Input()
  datasetType:string; // Optional 

  datasets:Dataset[] = [];
  selectedDataset:Dataset;

  constructor(private datasetService:DatasetService,
              private unstructuredCompIntService:UnstructuredCompIntService) { }

  ngOnInit(): void {
    this.getDatasets();
  }

  getDatasets() {
    this.datasetService.getDatasetsAccessibleToUser(this.datasetType).subscribe(res => {
      if (res != null) {
        this.datasets = res;

        // Preselect the first dataset
        this.selectedDataset = this.datasets[0];
        this.handleChangeOnDataset();
      }
    });

  }

  handleChangeOnDataset() {
    console.log(this.selectedDataset);
    this.unstructuredCompIntService.selectDataset(this.selectedDataset);
  }

}
