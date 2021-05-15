import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllCoursesComponent } from './get-all-courses.component';

describe('GetAllCoursesComponent', () => {
  let component: GetAllCoursesComponent;
  let fixture: ComponentFixture<GetAllCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAllCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAllCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
