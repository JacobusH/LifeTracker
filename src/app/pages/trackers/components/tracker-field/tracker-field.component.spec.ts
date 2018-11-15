import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerFieldComponent } from './tracker-field.component';

describe('TrackerFieldComponent', () => {
  let component: TrackerFieldComponent;
  let fixture: ComponentFixture<TrackerFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
