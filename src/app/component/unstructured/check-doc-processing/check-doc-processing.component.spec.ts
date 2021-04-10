import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckDocProcessingComponent } from './check-doc-processing.component';

describe('CheckDocProcessingComponent', () => {
  let component: CheckDocProcessingComponent;
  let fixture: ComponentFixture<CheckDocProcessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckDocProcessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckDocProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
