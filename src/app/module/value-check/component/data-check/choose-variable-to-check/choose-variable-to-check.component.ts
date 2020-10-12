import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dataset } from 'src/app/model/Dataset';
import { Variable } from 'src/app/model/Variable';
import { ProcessingService } from 'src/app/service/processing.service';
import {DataCheckService} from '../../../service/data-check.service';

@Component({
  selector: 'unstructured-data-choose-variable-to-check',
  templateUrl: './choose-variable-to-check.component.html',
  styleUrls: ['./choose-variable-to-check.component.scss']
})
export class ChooseVariableToCheckComponent implements OnInit {

  data:any[];
  cols: any[];

  selectedDataQualification:any;


  constructor(private route: ActivatedRoute,
              private processingService:ProcessingService,
              private dataCheckService:DataCheckService,
              private router:Router) { }


  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'name' },
      { field: 'rowsNb', header: 'rowsNb' },
    ];
    this.getDatasetsWithVariablesWithCheckValueInfo();
  }

  getDatasetsWithVariablesWithCheckValueInfo() {
    this.dataCheckService.getDatasetsWithVariablesWithCheckValueInfo().subscribe(res => {
      if (res.length > 0) {
        this.data = res;
      }
    });
  }

  onRowSelect(event) {
    console.log(event.data);
  }


  handleClick(event,variable) {    
    // console.log(event);
    console.log(variable);
    this.router.navigateByUrl(`/verification-variable/${variable.dataset_id}/${variable.variable_id}`);
    // this.router.navigateByUrl(`/verification-variable`);
    // this.router.navigate([`./verification-variable/${variable.variable_id}`]);
  }

}
