import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LtComponentsComponent } from './lt-components.component';

describe('LtComponentsComponent', () => {
  let component: LtComponentsComponent;
  let fixture: ComponentFixture<LtComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LtComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LtComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
