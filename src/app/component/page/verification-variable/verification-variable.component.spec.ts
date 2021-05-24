import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VerificationVariableComponent } from './verification-variable.component';

describe('VerificationVariableComponent', () => {
  let component: VerificationVariableComponent;
  let fixture: ComponentFixture<VerificationVariableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationVariableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationVariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
