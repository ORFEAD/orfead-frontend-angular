import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CheckDocVariableComponent } from './check-doc-variable.component';

describe('CheckDocVariableComponent', () => {
  let component: CheckDocVariableComponent;
  let fixture: ComponentFixture<CheckDocVariableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckDocVariableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckDocVariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
