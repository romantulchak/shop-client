import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpuComponent } from './gpu.component';

describe('GpuComponent', () => {
  let component: GpuComponent;
  let fixture: ComponentFixture<GpuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
