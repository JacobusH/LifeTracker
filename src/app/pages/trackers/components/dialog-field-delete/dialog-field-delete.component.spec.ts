import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFieldDeleteComponent } from './dialog-field-delete.component';

describe('DialogFieldDeleteComponent', () => {
  let component: DialogFieldDeleteComponent;
  let fixture: ComponentFixture<DialogFieldDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogFieldDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFieldDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
