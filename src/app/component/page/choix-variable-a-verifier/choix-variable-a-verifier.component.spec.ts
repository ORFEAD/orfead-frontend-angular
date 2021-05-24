import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChoixVariableAVerifierComponent } from './choix-variable-a-verifier.component';

describe('ChoixVariableAVerifierComponent', () => {
  let component: ChoixVariableAVerifierComponent;
  let fixture: ComponentFixture<ChoixVariableAVerifierComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoixVariableAVerifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoixVariableAVerifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
