import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthorizedAdminEditProductComponent } from './admin-authorized-admin-edit-product-component';

describe('AdminAuthorizedAdminEditProductComponent', () => {
  let component: AdminAuthorizedAdminEditProductComponent;
  let fixture: ComponentFixture<AdminAuthorizedAdminEditProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAuthorizedAdminEditProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAuthorizedAdminEditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
