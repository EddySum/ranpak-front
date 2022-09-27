import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointCloudViewerComponent } from './point-cloud-viewer.component';

describe('PointCloudViewerComponent', () => {
  let component: PointCloudViewerComponent;
  let fixture: ComponentFixture<PointCloudViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointCloudViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointCloudViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
