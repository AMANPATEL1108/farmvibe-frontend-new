import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthorizedOrdersDashboardComponent } from './admin-authorized-orders-dashboard-component';

describe('AdminAuthorizedOrdersDashboardComponent', () => {
  let component: AdminAuthorizedOrdersDashboardComponent;
  let fixture: ComponentFixture<AdminAuthorizedOrdersDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAuthorizedOrdersDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAuthorizedOrdersDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
