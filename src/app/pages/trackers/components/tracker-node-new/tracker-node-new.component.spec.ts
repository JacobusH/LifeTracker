import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerNodeNewComponent } from './tracker-node-new.component';

describe('TrackerNodeNewComponent', () => {
  let component: TrackerNodeNewComponent;
  let fixture: ComponentFixture<TrackerNodeNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerNodeNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerNodeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
