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
    private manualModificationToTextEltSource = new Subject<any>();
    private resultOfVariablesExtractionSource = new Subject<any>();
    private askTextEltsProcessingSource = new Subject<any>();
    private changeOnVariableValueManuallyFilledSource = new Subject<boolean>();

    // Observable string streams
    datasetSelected$ = this.datasetSelectedSource.asObservable();
    docForProcessing$ = this.docForProcessingSource.asObservable();
    docInProcess$ = this.docInProcessSource.asObservable();
    resultOfAnalyzeDocFileForAnonymization$ = this.resultOfAnalyzeDocFileForAnonymizationSource.asObservable();
    manualModificationToTextElt$ = this.manualModificationToTextEltSource.asObservable();
    resultOfVariablesExtraction$ = this.resultOfVariablesExtractionSource.asObservable();
    askTextEltsProcessing$ = this.askTextEltsProcessingSource.asObservable();
    changeOnVariableValueManuallyFilled$ = this.changeOnVariableValueManuallyFilledSource.asObservable();
  
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

    announceManualModificationToTextElt(textElt:any) {
      this.manualModificationToTextEltSource.next(textElt);
    }

    announceResultOfVariablesExtraction(result:any) {
      this.resultOfVariablesExtractionSource.next(result);
    }

    askTextEltsProcessing(o:any) {
      this.askTextEltsProcessingSource.next();
    }

    announceChangeOnVariableValueManuallyFilled() {
      this.changeOnVariableValueManuallyFilledSource.next(true);
    }

}
