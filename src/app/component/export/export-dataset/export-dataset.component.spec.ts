import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportDatasetComponent } from './export-dataset.component';

describe('ExportDatasetComponent', () => {
  let component: ExportDatasetComponent;
  let fixture: ComponentFixture<ExportDatasetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportDatasetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportDatasetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
