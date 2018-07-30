import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuWheelComponent } from './menu-wheel.component';

describe('MenuWheelComponent', () => {
  let component: MenuWheelComponent;
  let fixture: ComponentFixture<MenuWheelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuWheelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuWheelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
