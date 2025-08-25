import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrderCodConfirmationComponent } from './user-order-cod-confirmation-component';

describe('UserOrderCodConfirmationComponent', () => {
  let component: UserOrderCodConfirmationComponent;
  let fixture: ComponentFixture<UserOrderCodConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserOrderCodConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserOrderCodConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
