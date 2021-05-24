import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CheckAnonymizedTextEltComponent } from './check-anonymized-text-elt.component';

describe('CheckAnonymizedTextEltComponent', () => {
  let component: CheckAnonymizedTextEltComponent;
  let fixture: ComponentFixture<CheckAnonymizedTextEltComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckAnonymizedTextEltComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckAnonymizedTextEltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
