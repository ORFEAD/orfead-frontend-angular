import { Component, OnInit } from '@angular/core';
import { ProcessingService } from 'src/app/service/processing.service';
import { Subscription } from 'rxjs';
import { UnstructuredCompIntService } from 'src/app/service/comp-int/unstructured-comp-int.service';
import { Dataset } from 'src/app/model/Dataset';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DatasetPasswordComponent } from '../../dataset-password/dataset-password.component';
import { DatasetUnstructuredConfService } from 'src/app/service/dataset-unstructured-conf.service';
import { DatasetUnstructuredConf } from 'src/app/model/DatasetUnstructuredConf';
import { DatasetPasswordService } from 'src/app/service/dataset-password.service';
import { CheckDocProcessingComponent } from '../check-doc-processing/check-doc-processing.component';
import { Md5 } from 'ts-md5/dist/md5';
import { Utils } from 'src/app/util/utils';
import { TranslationService } from 'src/app/module/translation/service/translation.service';


@Component({
  selector: 'app-unstructured-dataset-upload',
  templateUrl: './unstructured-dataset-upload.component.html',
  styleUrls: ['./unstructured-dataset-upload.component.scss'],
  providers: [DialogService]
})
export class UnstructuredDatasetUploadComponent implements OnInit {

  dataset:Dataset;
  datasetUnstructuredConf:DatasetUnstructuredConf;
  analysesOfDocFilesForAnonymization:any[] = [];
  filesForProcessing:any[] = [];

  subscriptionToDatasetSelection: Subscription;
  subscriptionToFileInTreatment: Subscription;


  constructor(private processingService:ProcessingService,
              private componentsInteractionService:UnstructuredCompIntService,
              private datasetUnstructuredConfService:DatasetUnstructuredConfService,
              public dialogService: DialogService,
              private translationService:TranslationService,
              private datasetPasswordService:DatasetPasswordService) {

    this.subscriptionToDatasetSelection = this.componentsInteractionService.datasetSelected$.subscribe(
      dataset => {
       
        this.dataset = dataset;

        const datasetPassword = localStorage.getItem(
          Utils.getNameOfDatasetPasswordAttributeInLocalStorage(this.dataset.id)
        );
        if (datasetPassword == null) {
          this.dialogService.open(DatasetPasswordComponent,
            {header:`${this.translationService.getTranslation("dataset_password_for")}[${this.dataset.name}]`,
             width:"70%",
            //  height:"70%",
             data:{dataset:this.dataset}});
        }

      }
    );

    this.subscriptionToFileInTreatment = 
    this.componentsInteractionService.docForProcessing$.subscribe(
      f => {
        this.filesForProcessing.push(f);
      }
    );

  }  

  getDatasetUnstructuredConf() {
    this.datasetUnstructuredConfService.getDatasetUnstructuredConfFromDatasetId(this.dataset.id).subscribe(res => {
      if (res!=null) {
        console.log(res);
        this.datasetPasswordService.getWordsList(res.languageCode).subscribe(res => {
          // console.log(res);
          console.log(Md5.hashStr('blah blah blah'));
          console.log(Md5.hashAsciiStr('blah blah blah'));
        }); 

        
        // this.dialogService.open(DatasetPasswordComponent,
        //   {header:this.dataset.name,
        //     width:"70%",
        //    data:{dataset:this.dataset}});
        // }
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // Need to unsubscribe because even if the component gets destroyed
    //   the subscription can still be called
    this.subscriptionToDatasetSelection.unsubscribe(); 
    this.subscriptionToFileInTreatment.unsubscribe();
  }

  

}
