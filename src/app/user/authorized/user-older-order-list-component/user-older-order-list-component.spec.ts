import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOlderOrderListComponent } from './user-older-order-list-component';

describe('UserOlderOrderListComponent', () => {
  let component: UserOlderOrderListComponent;
  let fixture: ComponentFixture<UserOlderOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserOlderOrderListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserOlderOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
