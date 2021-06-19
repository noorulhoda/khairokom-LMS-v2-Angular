import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedFeedbackComponent } from './detailed-feedback.component';

describe('DetailedFeedbackComponent', () => {
  let component: DetailedFeedbackComponent;
  let fixture: ComponentFixture<DetailedFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
