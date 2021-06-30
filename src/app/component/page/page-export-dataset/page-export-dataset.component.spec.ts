import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageExportDatasetComponent } from './page-export-dataset.component';

describe('PageExportDatasetComponent', () => {
  let component: PageExportDatasetComponent;
  let fixture: ComponentFixture<PageExportDatasetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageExportDatasetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageExportDatasetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
