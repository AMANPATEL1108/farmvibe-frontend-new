import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrderOnlineConfirmationComponent } from './user-order-online-confirmation-component';

describe('UserOrderOnlineConfirmationComponent', () => {
  let component: UserOrderOnlineConfirmationComponent;
  let fixture: ComponentFixture<UserOrderOnlineConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserOrderOnlineConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserOrderOnlineConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
