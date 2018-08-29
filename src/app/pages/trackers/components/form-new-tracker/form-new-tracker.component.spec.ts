import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewTrackerComponent } from './form-new-tracker.component';

describe('FormNewTrackerComponent', () => {
  let component: FormNewTrackerComponent;
  let fixture: ComponentFixture<FormNewTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNewTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNewTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
