import { Component, OnInit } from '@angular/core';
import { ProcessingService } from 'src/app/service/processing.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.scss']
})
export class ProcessingComponent implements OnInit {

  uiBlocked = false;
  numberOfProcesses:number;
  displayProcessesInfo:boolean;

  constructor(public processingService:ProcessingService) { 
    this.processingService.blockingProcessSource$.subscribe(res =>{  
      // console.log(`ProcessingComponent with this.processingService.processes[${this.processingService.processes}]`)    
      this.uiBlocked = true;
      this.numberOfProcesses = this.processingService.processes;
      // console.log(`ProcessingComponent with this.numberOfProcesses[${this.numberOfProcesses}]`) 
    });
    this.processingService.unblockingProcessSource$.subscribe(res =>{
      if (this.processingService.processes <= 0) {
        this.uiBlocked = false;        
      }
      this.numberOfProcesses = this.processingService.processes;
    });
  }

  ngOnInit() {
    this.displayProcessesInfo = environment.displayProcessesInfo;
  }

}
