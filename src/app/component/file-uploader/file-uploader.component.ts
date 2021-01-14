import { Component, OnInit } from '@angular/core';
import { ProcessingService } from 'src/app/service/processing.service';
import { TranslationService } from 'src/app/module/translation/service/translation.service';
import { environment } from 'src/environments/environment';
import { UINotificationService } from 'src/app/service/uinotification.service';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { File } from 'src/app/model/File';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  constructor(private processingService:ProcessingService,
              private translationService:TranslationService,
              private uiNotificationService:UINotificationService,
              private fileUploadService:FileUploadService) { }

  ngOnInit(): void {
  }

  // https://medium.com/@codingindepth/customizing-angular-primeng-upload-control-87ea6aac0e63
  customUploader(e,form) {
    console.log(e.files[0]);

    var parentContainerType;
    var containerId = null;
  
    // Check the sizes of the different files
    for (let f of e.files){
      console.log(`${f.name}[${f.size}]`);
      var fileSizeInMByte = f.size / 1000000;

      console.log(`${f.name}[${fileSizeInMByte}]`);

      var errorMessage = `${this.translationService.getTranslation("@@max_size")}: 
                              ${environment.maxFileSizeInMByteForRasterImages}MB`
      var summaryMessage = `[XXFILENAMEXX] ${this.translationService.getTranslation("@@too_big").toLowerCase()}`;

      // Check filetype 
      // if (f.type.includes("image/")) {
      //   if (fileSizeInMByte > environment.maxFileSizeInMByteForRasterImages) {          
      //     this.uiNotificationService.notifyWarn(errorMessage, summaryMessage.replace("XXFILENAMEXX",f.name));
      //     return;
      //   }
      // } 
    }

    // Ask the middleware a presigned URL for putting the file then use this URL in a PUT request
    for (let f of e.files){

      this.processingService.blockUI("FilesBlocComponent.customUploader");

      // Get the presigned URL and relative path
    //   this.fileUploadService.getPresignedUrlForPutRequestToCloud(f, containerId, parentContainerType).subscribe(res1 => {
        
    //     if (res1 != null) {
    //       // Upload the file to the cloud
    //       this.fileUploadService.putFileOnAWS(f, res1.presignedURL).subscribe(res2 => {
    //         console.log(res2);
    //         if (res2 != null) {
    //           // Create the File instance in the database (also create the thumbnail for images)
    //           var fileInstance = new File({message: this.message, 
    //                                        styleGuide: this.styleGuide,
    //                                        name: f.name,
    //                                        pathFromDataDir: res1.relativeFilePath});
    //           this.fileUploadService.saveFile(fileInstance).subscribe(res3 => {
    //             if (res3 != null) {
    //               this.processingService.unblockUI("FilesBlocComponent.customUploader");
    //               this.uiNotificationService.notifySuccess(this.translationService.getTranslation("@@file_uploaded"));
    //               this.getFiles();
    //             } else {
    //               this.processingService.unblockUI("FilesBlocComponent.customUploader");
    //             }
    //           });
    //         } else {
    //           this.processingService.unblockUI("FilesBlocComponent.customUploader");
    //         }            
    //       });
    //     } else {
    //       this.processingService.unblockUI("FilesBlocComponent.customUploader");
    //     }
    // });
  
  }

  form.clear();

    // this.fileUploadService.putFileOnAWS(e.files[0]).subscribe(res => {
    //   console.log(res);
    //   form.clear();
    // });
  }

}
