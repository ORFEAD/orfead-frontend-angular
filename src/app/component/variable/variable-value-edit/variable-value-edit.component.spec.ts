import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableValueEditComponent } from './variable-value-edit.component';

describe('VariableValueEditComponent', () => {
  let component: VariableValueEditComponent;
  let fixture: ComponentFixture<VariableValueEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariableValueEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariableValueEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
