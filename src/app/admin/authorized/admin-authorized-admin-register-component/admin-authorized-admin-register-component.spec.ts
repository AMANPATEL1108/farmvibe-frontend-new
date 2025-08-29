import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthorizedAdminRegisterComponent } from './admin-authorized-admin-register-component';

describe('AdminAuthorizedAdminRegisterComponent', () => {
  let component: AdminAuthorizedAdminRegisterComponent;
  let fixture: ComponentFixture<AdminAuthorizedAdminRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAuthorizedAdminRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAuthorizedAdminRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
