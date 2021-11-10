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
import { UnstructuredTopCompIntService } from 'src/app/service/comp-int/unstructured-top-comp-int.service';
import { UINotificationService } from 'src/app/service/uinotification.service';


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
  subscriptionToDocRemovedFromProcessingStack: Subscription;
  subscriptionToDocProcessingInProgressStack: Subscription;
  subscriptionToDocDoneProcessingStack: Subscription;

  filesNamesRemovedFromStack:any[] = [];
  filesNamesProcessingInProgress:any[] = [];
  displayProcessingSpinner = false;

  constructor(private processingService:ProcessingService,
              private componentsInteractionService:UnstructuredCompIntService,
              private unstructuredTopCompIntService:UnstructuredTopCompIntService,
              private datasetUnstructuredConfService:DatasetUnstructuredConfService,
              public dialogService: DialogService,
              private notificationService:UINotificationService,
              private translationService:TranslationService,
              private datasetPasswordService:DatasetPasswordService) {

    // Subscribe to the selection of dataset
    this.subscriptionToDatasetSelection = this.componentsInteractionService.datasetSelected$.subscribe(
      dataset => {
       
        this.dataset = dataset;
        this.checkDatasetPasswordExists();
        

      }
    );

    // Subscribe to the upload of a file
    this.subscriptionToFileInTreatment = 
      this.componentsInteractionService.docForProcessing$.subscribe(
        f => {
          // Remove the filename from the list of files removed from the stack
          // This is needed because we may want to upload a file several times
          this.filesNamesRemovedFromStack = this.filesNamesRemovedFromStack.filter(
            x => {
              x != f["name"];
            }
          );
          this.filesForProcessing.push(f);          
        }
      );

    // Subscribe to file being totally done with its treatment
    this.subscriptionToDocRemovedFromProcessingStack = 
      this.unstructuredTopCompIntService.docRemovedFromProcessingStack$.subscribe(
        f => {
          this.filesNamesRemovedFromStack.push(f["name"]);
          let idxOfFileDone = this.filesForProcessing.findIndex(x => 
            x["name"] == f["name"]
          );
          // this.filesForProcessing = this.filesForProcessing.filter(x => {
          //   x["name"] != f["name"];
          // });
          this.filesForProcessing.splice(idxOfFileDone,1);
          }
      );

    // Subscribe to file that start to be processed
    this.subscriptionToDocProcessingInProgressStack = 
    this.unstructuredTopCompIntService.docStartedProcessingStack$.subscribe(
      f => {       
        let _fileName = f["name"];
        let _status = "En cours";
        this.filesNamesProcessingInProgress.push({name:_fileName,
                                                  processingStatus:_status});
        this.displayProcessingSpinner = true;
        }
    );

    // Subscribe to file being done with processing
    this.subscriptionToDocDoneProcessingStack = 
      this.unstructuredTopCompIntService.docDoneProcessingStack$.subscribe(
        r => {
          let _fileName = r["file"]["name"];
          let _status = r["status"];
          let idxOfFileNameDone = this.filesNamesProcessingInProgress.findIndex(x => x["name"] == _fileName);
          this.filesNamesProcessingInProgress[idxOfFileNameDone]["processingStatus"] = _status;
          // this.filesNamesProcessingInProgress.splice(idxOfFileNameDone,1);
          this.notificationService.notifyInfo(`${this.translationService.getTranslation("done_processing")}[${_fileName}]`);
          this.displayProcessingSpinner = false;
          }
      );

  }  

  checkDatasetPasswordExists() {
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

  clearDatasetPassword() {
    localStorage.removeItem(
      Utils.getNameOfDatasetPasswordAttributeInLocalStorage(this.dataset.id)
    );
    this.checkDatasetPasswordExists();
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
