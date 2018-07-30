import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackersPage } from './trackers.page';

describe('TrackersPage', () => {
  let component: TrackersPage;
  let fixture: ComponentFixture<TrackersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
