import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckAnonymizedSentenceComponent } from './check-anonymized-sentence.component';

describe('CheckAnonymizedSentenceComponent', () => {
  let component: CheckAnonymizedSentenceComponent;
  let fixture: ComponentFixture<CheckAnonymizedSentenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckAnonymizedSentenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckAnonymizedSentenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
