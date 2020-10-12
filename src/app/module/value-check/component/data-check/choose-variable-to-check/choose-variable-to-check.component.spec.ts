import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseVariableToCheckComponent } from './choose-variable-to-check.component';

describe('ChooseVariableToCheckComponent', () => {
  let component: ChooseVariableToCheckComponent;
  let fixture: ComponentFixture<ChooseVariableToCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseVariableToCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseVariableToCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
