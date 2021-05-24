import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CheckDocVariablesComponent } from './check-doc-variables.component';

describe('CheckDocVariablesComponent', () => {
  let component: CheckDocVariablesComponent;
  let fixture: ComponentFixture<CheckDocVariablesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckDocVariablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckDocVariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
