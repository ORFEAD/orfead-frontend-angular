import { Component, OnInit } from '@angular/core';
import { DataQualificationService } from '../../../service/data-qualification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-qualification-home',
  templateUrl: './data-qualification-home.component.html',
  styleUrls: ['./data-qualification-home.component.scss']
})
export class DataQualificationHomeComponent implements OnInit {

  data:any[];
  cols: any[];

  selectedDataQualification:any;

  constructor(private dataQualificationService:DataQualificationService,
             private router:Router) { }

  ngOnInit(): void {

    this.cols = [
      { field: 'datasetName', header: 'datasetName' },
      { field: 'variablesNb', header: 'variablesNb' },
      { field: 'rowsNb', header: 'rowsNb' },
      { field: 'valuesChecked', header: 'valuesChecked' }
    ];

    this.getDataQualificationForListing()
    
  }  

  private getDataQualificationForListing() {
    this.dataQualificationService.getDataQualificationForListing().subscribe(res => {
      this.data  = res;
    });
  }

  onRowSelect(event) {
    console.log(event.data);
  }


  handleClick(event,variable) {    
    console.log(variable);
    this.router.navigateByUrl(`/check-variable/${variable.id}`);
  }

}
