import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerPage } from './beer.page';

describe('BeerPage', () => {
  let component: BeerPage;
  let fixture: ComponentFixture<BeerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
