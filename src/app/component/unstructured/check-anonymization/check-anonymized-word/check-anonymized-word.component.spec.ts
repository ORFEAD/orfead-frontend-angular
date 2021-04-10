import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckAnonymizedWordComponent } from './check-anonymized-word.component';

describe('CheckAnonymizedWordComponent', () => {
  let component: CheckAnonymizedWordComponent;
  let fixture: ComponentFixture<CheckAnonymizedWordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckAnonymizedWordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckAnonymizedWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
