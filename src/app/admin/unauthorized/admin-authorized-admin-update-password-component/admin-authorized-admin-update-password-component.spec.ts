import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthorizedAdminUpdatePasswordComponent } from './admin-authorized-admin-update-password-component';

describe('AdminAuthorizedAdminUpdatePasswordComponent', () => {
  let component: AdminAuthorizedAdminUpdatePasswordComponent;
  let fixture: ComponentFixture<AdminAuthorizedAdminUpdatePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAuthorizedAdminUpdatePasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAuthorizedAdminUpdatePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
