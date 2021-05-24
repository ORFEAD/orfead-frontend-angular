import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageNotAccessibleComponent } from './page-not-accessible.component';

describe('PageNotAccessibleComponent', () => {
  let component: PageNotAccessibleComponent;
  let fixture: ComponentFixture<PageNotAccessibleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNotAccessibleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotAccessibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
