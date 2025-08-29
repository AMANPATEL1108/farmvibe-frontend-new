import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthorizedProductsComponent } from './admin-authorized-products-component';

describe('AdminAuthorizedProductsComponent', () => {
  let component: AdminAuthorizedProductsComponent;
  let fixture: ComponentFixture<AdminAuthorizedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAuthorizedProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAuthorizedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
