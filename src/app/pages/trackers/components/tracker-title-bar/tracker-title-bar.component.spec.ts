import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerTitleBarComponent } from './tracker-title-bar.component';

describe('TrackerTitleBarComponent', () => {
  let component: TrackerTitleBarComponent;
  let fixture: ComponentFixture<TrackerTitleBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerTitleBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerTitleBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
