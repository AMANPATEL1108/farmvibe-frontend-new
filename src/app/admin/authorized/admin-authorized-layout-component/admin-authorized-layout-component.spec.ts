import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthorizedLayoutComponent } from './admin-authorized-layout-component';

describe('AdminAuthorizedLayoutComponent', () => {
  let component: AdminAuthorizedLayoutComponent;
  let fixture: ComponentFixture<AdminAuthorizedLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAuthorizedLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAuthorizedLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
