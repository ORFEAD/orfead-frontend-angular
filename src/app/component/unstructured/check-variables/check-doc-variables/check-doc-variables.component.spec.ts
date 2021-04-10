import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckDocVariablesComponent } from './check-doc-variables.component';

describe('CheckDocVariablesComponent', () => {
  let component: CheckDocVariablesComponent;
  let fixture: ComponentFixture<CheckDocVariablesComponent>;

  beforeEach(async(() => {
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
