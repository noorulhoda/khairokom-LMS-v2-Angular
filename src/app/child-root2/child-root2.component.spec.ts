import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildRoot2Component } from './child-root2.component';

describe('ChildRoot2Component', () => {
  let component: ChildRoot2Component;
  let fixture: ComponentFixture<ChildRoot2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildRoot2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildRoot2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
