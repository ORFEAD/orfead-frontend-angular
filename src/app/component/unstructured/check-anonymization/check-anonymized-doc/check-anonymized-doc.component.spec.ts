import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CheckAnonymizedDocComponent } from './check-anonymized-doc.component';

describe('CheckAnonymizedDocComponent', () => {
  let component: CheckAnonymizedDocComponent;
  let fixture: ComponentFixture<CheckAnonymizedDocComponent>;

  beforeEach(waitForAsync(() => {
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
