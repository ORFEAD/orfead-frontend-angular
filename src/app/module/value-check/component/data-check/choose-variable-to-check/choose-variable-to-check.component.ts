import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dataset } from 'src/app/model/Dataset';
import { Variable } from 'src/app/model/Variable';
import { ProcessingService } from 'src/app/service/processing.service';
import {DataCheckService} from '../../../service/data-check.service';
import {AuthenticationService} from 'src/app/module/appuser/service/authentication.service';
import { ROLE_CODE_NAME } from 'src/app/module/appuser/enum/ROLE_CODE_NAME';

@Component({
  selector: 'unstructured-data-choose-variable-to-check',
  templateUrl: './choose-variable-to-check.component.html',
  styleUrls: ['./choose-variable-to-check.component.scss']
})
export class ChooseVariableToCheckComponent implements OnInit {

  data:any[];
  cols: any[];

  selectedDataQualification:any;

  canDisplayGiveFinalCheckButton:boolean = false;


  constructor(private route: ActivatedRoute,
              private authenticationService:AuthenticationService,
              private processingService:ProcessingService,
              private dataCheckService:DataCheckService,
              private router:Router) { }


  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'name' },
      { field: 'rowsNb', header: 'rowsNb' },
    ];
    this.updateDisplayChecks();
    this.getDatasetsWithVariablesWithCheckValueInfo();
  }

  updateDisplayChecks() {
    if (this.authenticationService.hasRole(ROLE_CODE_NAME.can_settle_check_value_dispute)) {
      this.canDisplayGiveFinalCheckButton = true;
    }

  }

  getDatasetsWithVariablesWithCheckValueInfo() {
    this.processingService.blockUI("getDatasetsWithVariablesWithCheckValueInfo"); 
    this.dataCheckService.getDatasetsWithVariablesWithCheckValueInfo().subscribe(res => {
      if (res.length > 0) {

        this.data = res;
        console.log(this.data);
      }
      this.processingService.unblockUI("getDatasetsWithVariablesWithCheckValueInfo"); 
    });
  }

  onRowSelect(event) {
    console.log(event.data);
  }


  handleClick(event,variable,finalChecksOnly) {    
    // console.log(event);
    console.log(variable);
    this.router.navigateByUrl(`/verification-variable/${variable.dataset_id}/${variable.variable_id}/${finalChecksOnly}`);
    // this.router.navigateByUrl(`/verification-variable`);
    // this.router.navigate([`./verification-variable/${variable.variable_id}`]);
  }

}
