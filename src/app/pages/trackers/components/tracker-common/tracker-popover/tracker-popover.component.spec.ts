import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerPopoverComponent } from './tracker-popover.component';

describe('TrackerPopoverComponent', () => {
  let component: TrackerPopoverComponent;
  let fixture: ComponentFixture<TrackerPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
