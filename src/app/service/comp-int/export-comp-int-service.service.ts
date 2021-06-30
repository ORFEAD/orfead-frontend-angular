import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Dataset } from 'src/app/model/Dataset';

@Injectable({
  providedIn: 'root'
})
export class ExportCompIntServiceService {

  private datasetSelectedSource = new Subject<Dataset>();
  datasetSelected$ = this.datasetSelectedSource.asObservable();

   // Service message commands
   selectDataset(dataset: Dataset) {
    this.datasetSelectedSource.next(dataset);
  }
}
