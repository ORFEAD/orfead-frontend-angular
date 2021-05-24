import { Component, OnInit } from '@angular/core';
import { ProcessingService } from 'src/app/service/processing.service';
import { Subscription } from 'rxjs';
import { UnstructuredCompIntService } from 'src/app/service/comp-int/unstructured-comp-int.service';
import { Dataset } from 'src/app/model/Dataset';
import * as mnemonicWords from 'mnemonic-words';
// import * as bitcoreMnemonic from 'bitcore-mnemonic';
import * as bip39 from 'bip39';


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
    // const mnemonic = bip39.generateMnemonic();
    // var code = new bitcoreMnemonic(bitcoreMnemonic.Words.SPANISH);
    // console.log(code.toString());
    // console.log(mnemonicWords);
    // const mnemonic = bip39.generateMnemonic();
    // console.log(`mnemonic[${mnemonic}]`);
  }

  

}
