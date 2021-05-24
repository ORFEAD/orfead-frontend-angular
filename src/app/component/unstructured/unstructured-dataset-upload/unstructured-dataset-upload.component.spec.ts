import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UnstructuredDatasetUploadComponent } from './unstructured-dataset-upload.component';

describe('UnstructuredDatasetUploadComponent', () => {
  let component: UnstructuredDatasetUploadComponent;
  let fixture: ComponentFixture<UnstructuredDatasetUploadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UnstructuredDatasetUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnstructuredDatasetUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
