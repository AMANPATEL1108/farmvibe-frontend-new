import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthorizedAdminAddProductComponent } from './admin-authorized-admin-add-product-component';

describe('AdminAuthorizedAdminAddProductComponent', () => {
  let component: AdminAuthorizedAdminAddProductComponent;
  let fixture: ComponentFixture<AdminAuthorizedAdminAddProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAuthorizedAdminAddProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAuthorizedAdminAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
