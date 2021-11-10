import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Dataset } from 'src/app/model/Dataset';

@Injectable({
  providedIn: 'root'
})
export class UnstructuredTopCompIntService {

  private docRemovedFromProcessingStackSource = new Subject<boolean>();
  docRemovedFromProcessingStack$ = this.docRemovedFromProcessingStackSource.asObservable();

  private docStartedProcessingStackSource = new Subject<boolean>();
  docStartedProcessingStack$ = this.docStartedProcessingStackSource.asObservable();

  private docDoneProcessingStackSource = new Subject<any>();
  docDoneProcessingStack$ = this.docDoneProcessingStackSource.asObservable();

  constructor() { }

  announceDocRemovedFromProcessingStack(f:any) {
    this.docRemovedFromProcessingStackSource.next(f);
  }

  announceDocDoneProcessingStack(f:any, status:string) {
    this.docDoneProcessingStackSource.next({"file": f,
                                            "status": status});
  }

  announceDocStartedProcessingStack(f:any) {
    this.docStartedProcessingStackSource.next(f);
  }

}
