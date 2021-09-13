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

  private docDoneProcessingStackSource = new Subject<boolean>();
  docDoneProcessingStack$ = this.docDoneProcessingStackSource.asObservable();

  constructor() { }

  announceDocRemovedFromProcessingStack(f:any) {
    this.docRemovedFromProcessingStackSource.next(f);
  }

  announceDocDoneProcessingStack(f:any) {
    this.docDoneProcessingStackSource.next(f);
  }

  announceDocStartedProcessingStack(f:any) {
    this.docStartedProcessingStackSource.next(f);
  }

}
