import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataQualificationService } from 'src/app/service/data-qualification.service';

@Component({
  selector: 'app-check-variable',
  templateUrl: './check-variable.component.html',
  styleUrls: ['./check-variable.component.scss']
})
export class CheckVariableComponent implements OnInit {

  sources:any[] = [];
  variable:any;

  constructor(private route: ActivatedRoute,
              private dataQualificationService:DataQualificationService) { }

  ngOnInit(): void {
    this.getVariableFromParam();
  }

  getVariableFromParam(): void {    
    const id = this.route.snapshot.paramMap.get('id');   
    this.dataQualificationService.getNextValueToCheck(id).subscribe(res => {         
      if (res != null) {  
        console.log(res);
        this.variable = res.variable;
        this.sources = res.sources;
      }        
    }); 
  }

}
