import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthorizedProfileDashboardComponent } from './admin-authorized-profile-dashboard-component';

describe('AdminAuthorizedProfileDashboardComponent', () => {
  let component: AdminAuthorizedProfileDashboardComponent;
  let fixture: ComponentFixture<AdminAuthorizedProfileDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAuthorizedProfileDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAuthorizedProfileDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
