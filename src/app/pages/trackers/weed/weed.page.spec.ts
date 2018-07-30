import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeedPage } from './weed.page';

describe('WeedPage', () => {
  let component: WeedPage;
  let fixture: ComponentFixture<WeedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
