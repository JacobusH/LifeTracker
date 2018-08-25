import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerCommonComponent } from './tracker-common.component';

describe('TrackerCommonComponent', () => {
  let component: TrackerCommonComponent;
  let fixture: ComponentFixture<TrackerCommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerCommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
