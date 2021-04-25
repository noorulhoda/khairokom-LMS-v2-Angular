import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveregisterComponent } from './reactiveregister.component';

describe('ReactiveregisterComponent', () => {
  let component: ReactiveregisterComponent;
  let fixture: ComponentFixture<ReactiveregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactiveregisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
