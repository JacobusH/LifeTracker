import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelNodeComponent } from './model-node.component';

describe('ModelNodeComponent', () => {
  let component: ModelNodeComponent;
  let fixture: ComponentFixture<ModelNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
