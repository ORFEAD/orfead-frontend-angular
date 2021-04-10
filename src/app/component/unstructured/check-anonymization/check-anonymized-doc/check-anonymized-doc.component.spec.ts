import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckAnonymizedDocComponent } from './check-anonymized-doc.component';

describe('CheckAnonymizedDocComponent', () => {
  let component: CheckAnonymizedDocComponent;
  let fixture: ComponentFixture<CheckAnonymizedDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckAnonymizedDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckAnonymizedDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
