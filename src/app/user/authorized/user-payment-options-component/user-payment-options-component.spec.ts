import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPaymentOptionsComponent } from './user-payment-options-component';

describe('UserPaymentOptionsComponent', () => {
  let component: UserPaymentOptionsComponent;
  let fixture: ComponentFixture<UserPaymentOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPaymentOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPaymentOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
