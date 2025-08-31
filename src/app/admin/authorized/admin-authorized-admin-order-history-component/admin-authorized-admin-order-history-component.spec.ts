import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthorizedAdminOrderHistoryComponent } from './admin-authorized-admin-order-history-component';

describe('AdminAuthorizedAdminOrderHistoryComponent', () => {
  let component: AdminAuthorizedAdminOrderHistoryComponent;
  let fixture: ComponentFixture<AdminAuthorizedAdminOrderHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAuthorizedAdminOrderHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAuthorizedAdminOrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
