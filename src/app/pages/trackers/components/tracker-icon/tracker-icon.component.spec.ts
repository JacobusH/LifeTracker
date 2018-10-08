import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerIconComponent } from './tracker-icon.component';

describe('TrackerIconComponent', () => {
  let component: TrackerIconComponent;
  let fixture: ComponentFixture<TrackerIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
