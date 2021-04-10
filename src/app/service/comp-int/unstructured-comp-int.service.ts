import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Dataset } from 'src/app/model/Dataset';

@Injectable({
  providedIn: 'root'
})
export class UnstructuredCompIntService {

    // Observable string sources
    private datasetSelectedSource = new Subject<Dataset>();
    private docForProcessingSource = new Subject<any>();
    private docInProcessSource = new Subject<any>();
    private resultOfAnalyzeDocFileForAnonymizationSource = new Subject<any>();

    // Observable string streams
    datasetSelected$ = this.datasetSelectedSource.asObservable();
    docForProcessing$ = this.docForProcessingSource.asObservable();
    docInProcess$ = this.docInProcessSource.asObservable();
    resultOfAnalyzeDocFileForAnonymization$ = this.resultOfAnalyzeDocFileForAnonymizationSource.asObservable();
  
    // Service message commands
    selectDataset(dataset: Dataset) {
      this.datasetSelectedSource.next(dataset);
    }

    announceReceptionOfResultOfAnalyzeDocFileForAnonymization(dataForOneDocFile:any) {
      this.resultOfAnalyzeDocFileForAnonymizationSource.next(dataForOneDocFile);
    }

    announceStartOfDocProcessing(f:any) {
      this.docInProcessSource.next(f);
    }

    announceDocForProcessing(f:any) {
      this.docForProcessingSource.next(f);
    }

}
