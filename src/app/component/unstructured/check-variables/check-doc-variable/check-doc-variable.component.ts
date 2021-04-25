import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-doc-variable',
  templateUrl: './check-doc-variable.component.html',
  styleUrls: ['./check-doc-variable.component.scss']
})
export class CheckDocVariableComponent implements OnInit {

  @Input()
  variable:any;

  constructor() { }

  ngOnInit(): void {

    // console.log(this.variable);
  }

}
