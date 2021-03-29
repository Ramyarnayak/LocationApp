import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateBookingComponent } from './create-booking.component';

describe('CreateBookingComponent', () => {
  let component: CreateBookingComponent;
  let fixture: ComponentFixture<CreateBookingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
