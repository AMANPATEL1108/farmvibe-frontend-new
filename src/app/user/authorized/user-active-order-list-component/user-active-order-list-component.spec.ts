import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActiveOrderListComponent } from './user-active-order-list-component';

describe('UserActiveOrderListComponent', () => {
  let component: UserActiveOrderListComponent;
  let fixture: ComponentFixture<UserActiveOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserActiveOrderListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserActiveOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
