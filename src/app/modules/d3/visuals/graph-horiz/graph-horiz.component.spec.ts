import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphHorizComponent } from './graph-horiz.component';

describe('GraphHorizComponent', () => {
  let component: GraphHorizComponent;
  let fixture: ComponentFixture<GraphHorizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphHorizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphHorizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
