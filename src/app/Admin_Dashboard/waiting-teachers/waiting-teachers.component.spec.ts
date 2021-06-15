import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingTeachersComponent } from './waiting-teachers.component';

describe('WaitingTeachersComponent', () => {
  let component: WaitingTeachersComponent;
  let fixture: ComponentFixture<WaitingTeachersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingTeachersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
