import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdminForgotPasswordComponent } from './admin-admin-forgot-password-component';

describe('AdminAdminForgotPasswordComponent', () => {
  let component: AdminAdminForgotPasswordComponent;
  let fixture: ComponentFixture<AdminAdminForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAdminForgotPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAdminForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
