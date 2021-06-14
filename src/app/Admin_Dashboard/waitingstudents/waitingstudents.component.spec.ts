import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingstudentsComponent } from './waitingstudents.component';

describe('WaitingstudentsComponent', () => {
  let component: WaitingstudentsComponent;
  let fixture: ComponentFixture<WaitingstudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingstudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingstudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
