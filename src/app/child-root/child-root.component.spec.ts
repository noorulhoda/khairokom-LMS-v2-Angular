import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildRootComponent } from './child-root.component';

describe('ChildRootComponent', () => {
  let component: ChildRootComponent;
  let fixture: ComponentFixture<ChildRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
