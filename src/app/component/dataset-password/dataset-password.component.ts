import { Component, Input, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Dataset } from 'src/app/model/Dataset';
import { UnstructuredCompIntService } from 'src/app/service/comp-int/unstructured-comp-int.service';
import { DatasetPasswordService } from 'src/app/service/dataset-password.service';
import { DatasetUnstructuredConfService } from 'src/app/service/dataset-unstructured-conf.service';
import {Md5} from 'ts-md5/dist/md5';
import * as Hash from 'hash.js';
import { Utils } from 'src/app/util/utils';
import { join } from '@angular/compiler-cli/src/ngtsc/file_system';

@Component({
  selector: 'app-dataset-password',
  templateUrl: './dataset-password.component.html',
  styleUrls: ['./dataset-password.component.scss']
})
export class DatasetPasswordComponent implements OnInit {

  @Input()
  dataset:Dataset;

  canSavePassword:boolean = false;

  minNbOfWordsRequired:number = 5;


  allWords:SelectItem[] = [{label:"toto",
                            value: "toto"},
                            {label:"tata",
                            value: "tata"}];
  selectedWords:string[] = [];

  constructor(private unstructuredCompIntService:UnstructuredCompIntService,
              private datasetUnstructuredConfService:DatasetUnstructuredConfService,
              private datasetPasswordService:DatasetPasswordService,
              public dynamicDialogRef: DynamicDialogRef,
              public config: DynamicDialogConfig) { 
    
  }

  ngOnInit(): void {
    this.dataset = this.config.data.dataset;
    this.getDatasetUnstructuredConf();
  }

  getDatasetUnstructuredConf() {
    this.datasetUnstructuredConfService.getDatasetUnstructuredConfFromDatasetId(this.dataset.id).subscribe(res => {
      if (res!=null) {
        
        this.datasetPasswordService.getWordsList(res.languageCode).subscribe(res => {
          if (res != null) {
            this.allWords = [];
            for (let w of res) {
              this.allWords.push({
                label:w,
                value: w
              })             
            }
            Utils.shuffle(this.allWords);
          }
          console.log(Hash.sha512().update('fleurexemple').digest('hex'));
          console.log(Hash.ripemd160().update('abc').digest('hex'));
          // console.log(res);
          // console.log(Md5.hashStr('blah blah blah'));
          // console.log(Md5.hashAsciiStr('blah blah blah'));
        }); 
       
      }
    });
  }

  checkIfCanSavePassword(evt) {
    if (this.selectedWords.length >= this.minNbOfWordsRequired) {
      this.canSavePassword = true;
    } else {
      this.canSavePassword = false;
    }
  }

  generatePasswordHashInLocalStorage() {
    let concatenatedWords = this.selectedWords.join();
    let password = Hash.sha512().update(concatenatedWords).digest('hex')
    localStorage.setItem(
      Utils.getNameOfDatasetPasswordAttributeInLocalStorage(this.dataset.id),
      password
    );
    this.dynamicDialogRef.close();
  }

}
