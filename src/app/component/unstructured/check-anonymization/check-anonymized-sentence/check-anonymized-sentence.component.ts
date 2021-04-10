import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-anonymized-sentence',
  templateUrl: './check-anonymized-sentence.component.html',
  styleUrls: ['./check-anonymized-sentence.component.scss']
})
export class CheckAnonymizedSentenceComponent implements OnInit {

  @Input()
  words:any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
