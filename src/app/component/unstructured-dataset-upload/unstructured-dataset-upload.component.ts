import { Component, OnInit } from '@angular/core';
import { ProcessingService } from 'src/app/service/processing.service';

@Component({
  selector: 'app-unstructured-dataset-upload',
  templateUrl: './unstructured-dataset-upload.component.html',
  styleUrls: ['./unstructured-dataset-upload.component.scss']
})
export class UnstructuredDatasetUploadComponent implements OnInit {

  constructor(private processingService:ProcessingService) { }

  ngOnInit(): void {
  }

  

}
