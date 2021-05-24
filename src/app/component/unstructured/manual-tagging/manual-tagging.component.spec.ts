import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ManualTaggingComponent } from './manual-tagging.component';

describe('ManualTaggingComponent', () => {
  let component: ManualTaggingComponent;
  let fixture: ComponentFixture<ManualTaggingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualTaggingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualTaggingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
