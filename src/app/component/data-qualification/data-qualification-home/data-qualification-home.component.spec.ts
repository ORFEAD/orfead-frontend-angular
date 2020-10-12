import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataQualificationHomeComponent } from './data-qualification-home.component';

describe('DataQualificationHomeComponent', () => {
  let component: DataQualificationHomeComponent;
  let fixture: ComponentFixture<DataQualificationHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataQualificationHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataQualificationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
