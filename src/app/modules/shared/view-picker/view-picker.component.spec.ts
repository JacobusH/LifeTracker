import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPickerComponent } from './view-picker.component';

describe('ViewPickerComponent', () => {
  let component: ViewPickerComponent;
  let fixture: ComponentFixture<ViewPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
